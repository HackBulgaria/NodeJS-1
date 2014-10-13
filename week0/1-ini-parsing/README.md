# Week 0

## Parsing ini files

The task is to read in a [INI file](https://en.wikipedia.org/wiki/INI_file) and parse its contents.

So given `config.ini` with the following contents:

```ini
[panda]
name=Stamat
lazyness=95
cuteness=123

[unicorn]
name=Pencho
age=0.3 bilion
horns=1
probability=0.1e-50000
```

Running `node our_script.js config.ini` should create `config.json` with the following contents:

```json
{
  "panda": {
    "name": "Stamat",
    "lazyness": "95",
    "cuteness": "123"
  },
  "unicorn": {
    "name": "Pencho",
    "age": "0.3 bilion",
    "horns": "1",
    "probability": "0.1e-50000"
  }
}
```

### Gotchas
 * There can be multiple blank lines all over the file for readability purposes, they should just be ignored when parsing it.
 * Spaces around equal signs and trailing spaces should be ok, although it's a good idea to warn that other parsers might not be as benevolent as ours.
 * Lines starting with a semicolon(`;`) are comments, and should be ignored when parsing.



### Local files are boring
If we give our script an HTTP(S) URL instead of a filename it should fetch what's on that URL assuming it's a valid ini file. The name of the produced file should be the last part of the path of the URL. If the URL ends with `.ini` it should be replaced by `.json`, otherwise `.json` should just be appended to it.

So calling `node our_script.js https://raw.githubusercontent.com/HackBulgaria/NodeJS-1/master/week0/1-ini-parsing/config.ini` should create `config.json`

## The other way around
Once we know how to convert `.ini` to `.json` it would be nice to have it work both ways. Extend the script to also accept a json file and write the corresponding ini file. Again running `node our_script.js config.json` should create `config.ini`. The script should detect if the argument is a json or an ini file based on the file extension. If we can't deduce the file type from the extension(or there is no extension) assume it's an ini file.

### Explicit file type

```bash
    npm install argparse --save
```

Using the [argparse](https://github.com/nodeca/argparse) module add the capability to explicitly state the type of the file we are giving. Add an argument `--type` which can be either `ini` or `json` and tells the type of the input file given.

So we could call `node our_script.js typeless_config --type=ini`. That invocation should mean that `typeless_config` is actually an ini file.

### Testing your solution

This directory has a `package.json` file defining the tools needed to test your solution. Assuming your code is in `solution.js` if you run `node test` will run a small test suite on it, testing with the two local files.
