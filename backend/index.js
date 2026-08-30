const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
    .command(
        "init",
        "Initialize a new repository",
        {},
        initRepo
    )

    .command(
        "add <file>",
        "Add a file to the staging area",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to be added in staging area",
                type: "string",
            });
        },
        (argv) => {
            addRepo(argv.file);
        }
    )

    .command(
        "commit <message>",
        "Commit staged changes",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string",
            });
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )

    .command(
        "push",
        "Push commits to remote repository",
        {},
        pushRepo
    )

    .command(
        "pull",
        "Pull latest changes from remote repository",
        {},
        pullRepo
    )

    .command(
        "revert <commitID>",
        "Revert a specific commit",
        (yargs) => { 
            yargs.positional("commitID", {
                describe: "Commit ID to revert",
                type: "string",
            });
        },
        revertRepo
    )

    .demandCommand(
        1,
        "You need to enter at least one command"
    )
    .help()
    .argv;