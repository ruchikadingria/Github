const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".myGit");

    try {
        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: "commits/"
        }).promise();

        const objects = data.Contents || [];

        if (objects.length === 0) {
            console.log("No commits found in S3.");
            return;
        }

        for (const object of objects) {
            const key = object.Key;

            // Skip folder placeholders if any
            if (key.endsWith("/")) continue;

            const params = {
                Bucket: S3_BUCKET,
                Key: key
            };

            const fileContent = await s3.getObject(params).promise();

            // Local path where file should be saved
            const localFilePath = path.join(repoPath, key);

            // Create parent directories
            await fs.mkdir(
                path.dirname(localFilePath),
                { recursive: true }
            );

            // Write file
            await fs.writeFile(
                localFilePath,
                fileContent.Body
            );

            console.log(`Pulled: ${key}`);
        }

        console.log("All commits pulled from S3.");
    } catch (err) {
        console.error("Unable to pull:", err);
    }
}

module.exports = { pullRepo };