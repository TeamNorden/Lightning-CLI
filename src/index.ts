import yargs from 'yargs'

yargs.version('1.0.0')

yargs
    .scriptName("bolt")
    .usage('$0 <cmd> [args]')
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv
