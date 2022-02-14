import yargs from 'yargs'

yargs.version('1.0.0')

yargs
    .scriptName("pirate-parser")
    .usage('$0 <cmd> [args]')
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv
