# cmd_calc
Command line calculator in Node.js

To run enter the command:
>node calc.js <path to input files with .txt extension>
Example: 
>node calc.js ./data 
Example: 
>node calc.js /home/you/docs

Output will text files with the same names but with a .out extension.
Example: Input file is info.txt, output file will be info.txt.out

Note: I've noticed a special character that looks like the hiphen (-) but is not.
It's probably a different encoding, which will produce an error on the line:
21 – 4  --> Error, that's not '-'!!! 
21 - 4  --> OK