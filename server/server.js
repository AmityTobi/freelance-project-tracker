import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data", "db.json");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- DB helpers ----------

async function readDb() {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDb(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function findClient(db, clientId) {
  return db.clients.find((client) => client.id === clientId);
}

function findProject(client, projectId) {
  return client.projects.find((project) => project.id === projectId);
}

// ---------- Clients ----------

app.get("/api/clients", async (req, res) => {
  const db = await readDb();
  res.json(db.clients);
});

app.post("/api/clients", async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "fullName and email are required" });
  }

  const db = await readDb();

  const newClient = {
    id: randomUUID(),
    fullName,
    email,
    projects: [],
  };

  db.clients.push(newClient);
  await writeDb(db);

  res.status(201).json(newClient);
});

app.delete("/api/clients/:clientId", async (req, res) => {
  const db = await readDb();
  db.clients = db.clients.filter((client) => client.id !== req.params.clientId);
  await writeDb(db);
  res.status(204).send();
});

// ---------- Projects ----------

app.post("/api/clients/:clientId/projects", async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const db = await readDb();
  const client = findClient(db, req.params.clientId);

  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }

  const newProject = {
    id: randomUUID(),
    title,
    dueDate: dueDate || null,
    tasks: [],
  };

  client.projects.push(newProject);
  await writeDb(db);

  res.status(201).json(newProject);
});

app.delete("/api/clients/:clientId/projects/:projectId", async (req, res) => {
  const db = await readDb();
  const client = findClient(db, req.params.clientId);

  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }

  client.projects = client.projects.filter(
    (project) => project.id !== req.params.projectId,
  );
  await writeDb(db);

  res.status(204).send();
});

// ---------- Tasks ----------

app.post(
  "/api/clients/:clientId/projects/:projectId/tasks",
  async (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const db = await readDb();
    const client = findClient(db, req.params.clientId);
    const project = client && findProject(client, req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newTask = {
      id: randomUUID(),
      title,
      completed: false,
    };

    project.tasks.push(newTask);
    await writeDb(db);

    res.status(201).json(newTask);
  },
);

app.patch(
  "/api/clients/:clientId/projects/:projectId/tasks/:taskId",
  async (req, res) => {
    const db = await readDb();
    const client = findClient(db, req.params.clientId);
    const project = client && findProject(client, req.params.projectId);
    const task = project?.tasks.find((task) => task.id === req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (typeof req.body.completed === "boolean") {
      task.completed = req.body.completed;
    }

    await writeDb(db);
    res.json(task);
  },
);

// Reorder tasks within a project (drag-and-drop)
app.patch(
  "/api/clients/:clientId/projects/:projectId/tasks/reorder",
  async (req, res) => {
    const { taskIds } = req.body;

    const db = await readDb();
    const client = findClient(db, req.params.clientId);
    const project = client && findProject(client, req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const taskMap = new Map(project.tasks.map((task) => [task.id, task]));
    project.tasks = taskIds
      .map((id) => taskMap.get(id))
      .filter((task) => task !== undefined);

    await writeDb(db);
    res.json(project.tasks);
  },
);

app.delete(
  "/api/clients/:clientId/projects/:projectId/tasks/:taskId",
  async (req, res) => {
    const db = await readDb();
    const client = findClient(db, req.params.clientId);
    const project = client && findProject(client, req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.tasks = project.tasks.filter(
      (task) => task.id !== req.params.taskId,
    );
    await writeDb(db);

    res.status(204).send();
  },
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
