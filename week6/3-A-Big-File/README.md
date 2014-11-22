# A Big File

We want to use Node streams in order to read a big file, containing random numbers, separated by `,` and compute their sum.
The file should be of size around `5GB`, so it wont be easy to load it in memory.

## Create a big file with numbers in it

Make a Node program that generates random numbers, separated by `,` and `\n` and saves / streams them to a file.

Make sure that you can call your program with flags, saying how big the file should become, before closing it.

For example:

```
$ node make-file.js --size 5GB --output BIG_FAT_FILE_WITH_NUMBERS
```

This will create a `5GB` file called `BIG_FAT_FILE_WITH_NUMBERS`


You can support the basic measurements - `MB` and `GB`

## Read the big file and find the sum of the numbers

Once you have a large enough file, try to read it entirely in memory and make sure that Node crashes with the following error:

```
FATAL ERROR: CALL_AND_RETRY_0 Allocation failed - process out of memory
```

Once you have reached that point, you can start using the stream API in order to process the file line by line and find the sum of all numbers.

## Libraries

* [Event Stream](https://github.com/dominictarr/event-stream) should do fine, but you are free to searc for whatever libraries you want to use for this problem.
* [Node-Bigint](https://github.com/substack/node-bigint) for calculating big sums / numbers
