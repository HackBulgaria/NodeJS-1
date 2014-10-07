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
