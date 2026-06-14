import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for large base64 strings or images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API to save updated defaultData.ts
  app.post("/api/save-portfolio-data", (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== "object") {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const filePath = path.join(process.cwd(), "src/defaultData.ts");
      
      // Let's pretty format the TypeScript export
      const fileContent = `import { PortfolioData } from "./types";\n\nexport const INITIAL_PORTFOLIO_DATA: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
      
      fs.writeFileSync(filePath, fileContent, "utf8");
      console.log("Successfully saved updated initial portfolio data to src/defaultData.ts");
      return res.json({ success: true });
    } catch (error: any) {
      console.error("Error saving portfolio data:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // GET Endpoint to download defaultData.ts directly
  app.get("/api/download/defaultData", (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "src/defaultData.ts");
      if (fs.existsSync(filePath)) {
        res.setHeader("Content-Disposition", "attachment; filename=defaultData.ts");
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.sendFile(filePath);
      } else {
        return res.status(404).json({ error: "defaultData.ts not found on server" });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  });

  // GET Endpoint to download package-lock.json directly
  app.get("/api/download/package-lock", (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "package-lock.json");
      if (fs.existsSync(filePath)) {
        res.setHeader("Content-Disposition", "attachment; filename=package-lock.json");
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.sendFile(filePath);
      } else {
        return res.status(404).json({ error: "package-lock.json not found on server" });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  });

  // POST Endpoint to update/alter defaultData.ts via plain text string
  app.post("/api/upload/defaultData", (req, res) => {
    try {
      const { content } = req.body;
      if (!content || typeof content !== "string") {
        return res.status(400).json({ error: "Content must be a non-empty string" });
      }
      
      const filePath = path.join(process.cwd(), "src/defaultData.ts");
      fs.writeFileSync(filePath, content, "utf8");
      return res.json({ success: true, message: "defaultData.ts successfully modified!" });
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  });

  // POST Endpoint to update/alter package-lock.json via plain text representation
  app.post("/api/upload/package-lock", (req, res) => {
    try {
      const { content } = req.body;
      if (!content || typeof content !== "string") {
        return res.status(400).json({ error: "Content must be a non-empty string" });
      }

      // Quick JSON validation
      JSON.parse(content);
      
      const filePath = path.join(process.cwd(), "package-lock.json");
      fs.writeFileSync(filePath, content, "utf8");
      return res.json({ success: true, message: "package-lock.json successfully modified!" });
    } catch (error: any) {
      return res.status(400).json({ error: "Failed to parse content as valid package-lock JSON. Error: " + error?.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
