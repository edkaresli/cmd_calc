const fs = require('fs');

const processLine = (aa, op, bb) => {
    const a = parseInt(aa);
    const b = parseInt(bb);
    switch(op) {
        case '+': {
            const c = a + b;
            return `${a} + ${b} = ${c}`;
        } 
            
        case '-': {
            const c = a - b;
            return `${a} - ${b} = ${c}`;
        }
            
        case '*': {
            const c = a * b;
            return `${a} * ${b} = ${c}`;
        }
                 
        case '/': {
            if(b === 0) 
              return 'Error, division by zero!';
            const c = a / b;
            return `${a} / ${b} = ${c}`;
        }
            
        default:
            throw "Error, unsupported operation!";
    } 
}

const readAllDataFromFile = async (path, fname) => {    
    try {
        let fileOutput = '';
        console.log("File: ", fname);       
       fs.readFile(path + '/' + fname, 'utf8', (err, data) => {
           if(err) {
               console.error(err);
           }
           else {
              console.log(`File content ${fname}:`); 
              // parse data line by line;
              // create output file and prepare output string
              // once finished processing input data string, save results to output file 
              const lines = data.split(/\r?\n/);
              const processed = lines.map(line => {                   
                console.log("Input line: ", line);                
                const patt1 = /[0-9]+/g;                
                const patt2 = /[\+\*\/\-]/g;                
                const end = '=';
                const errPatt1 = /[a-zA-Z]/;
                const errPatt2 = /[(){}|,"'`–~!@#$%^&_\];[>]+/;
                if(line.match(end) !== null) {
                    return '';
                }
                else {
                    let currentStr = '';
                    if(line.match(errPatt1) !== null || line.match(errPatt2) !== null) {
                        currentStr = 'Error';
                        console.log(`Output line: ${currentStr}`);
                        return currentStr;
                    }
                    else {                        
                        const part1 = line.match(patt1)[0];
                        const part2 = line.match(patt1)[1];
                        const op = line.match(patt2)[0];                        
                        const outputLine = processLine(part1, op, part2);                        
                        return outputLine;                        
                    }
                }               
              });
              const finalOutput = processed.join('\n');
              fs.writeFile(path + '/' + fname + '.out', finalOutput, 'utf8', (err) => {
                  if(err) {
                      console.error(err);
                  }
              });
            }           
       })
    } catch (error) {
        console.error(error);
    }    
}

const readAllEntries = (pathname) => {    
    fs.readdir(pathname, {encoding: "utf-8"}, (err, files) => {
      if(err) {
          console.error(err);
          return [];
      }
      console.log("Files: ", files);
      // got the file names array, now process every single one
      console.log("Pathname: ", pathname);
      files.forEach(file => {
          readAllDataFromFile(pathname, file);
      })      
    })    
}

const main = () => {
    // read argv 
      // read all files from given directory
        // read single file
          // process input line by line and store results in an array
            // save results in an output file with .out as a file extension          
    try {
       const dir = process.argv[2] || './data'; 
       readAllEntries(dir);           
    } catch (error) {
       console.error(error); 
    }    
}

main();