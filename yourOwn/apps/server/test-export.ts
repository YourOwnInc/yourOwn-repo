import { generatePortfolioData, insertPatterns, zipPortfolio } from "./src/jobs/exports/exports.service";
import { prisma } from "./src/lib/prisma";
import crypto from "crypto";
import path from "path";

async function run() {
    const session = await prisma.session.findFirst();
    if (!session) {
        console.log("No session found in db. Cannot test export.");
        return;
    }

    const sessionId = session.id;
    console.log("Testing export with Session ID:", sessionId);

    const exportId = crypto.randomUUID();
    const workspaceDir = path.resolve(process.cwd(), "../../tmp", "workspaces", exportId);

    // 1. generate data
    const data = await generatePortfolioData(sessionId);
    console.log("Portfolio Data generated!");

    // 2. insert patterns
    await insertPatterns({ workspaceDir, portfolioData: data });
    console.log("Patterns inserted!");

    // 3. zip
    const zipPath = path.resolve(process.cwd(), "../../tmp", "exports", `${exportId}.zip`);
    await zipPortfolio({ workspaceDir, zipPath });
    console.log("Zip successful! At:", zipPath);
}

run().catch(console.error);
