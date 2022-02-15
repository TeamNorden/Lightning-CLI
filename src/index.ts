import yargs from 'yargs'

yargs.version('0.1.0')

yargs
    .scriptName("bolt")
    .usage('$0 <cmd> [args]')
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv
