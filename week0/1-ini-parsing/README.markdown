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
Spaces around equal signs and trailing spaces should be ok, although it's a good idea to warn that other parsers might not be as benevolent as ours.

### Local files are boring
If we give our script an HTTP(S) URL instead of filename we should fetch what's on that URL assuming it's a valid ini file.
