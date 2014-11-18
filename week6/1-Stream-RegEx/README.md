#Regular expression streams

##Filter Transform stream
Write a constructor, inheriting from `Transform` stream, that takes as an argument a regular expression as an argument. The constructed stream object should output only the chunks input to it, that match the regular expression.

Extend your code when a `RegExp` object is written to the stream, that causes it to start using that as the pattern from now on.
