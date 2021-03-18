#!/usr/bin/env node

// const fs=require('fs');
// let data=fs.readFileSync("abc.txt","utf-8");
// console.log(data);

 let cmds  = process.argv.slice(2);
const fs = require('fs');

function wcat(cmds){
    let options = cmds.filter(function(data){
        return data.startsWith("-");
    });
    let files = cmds.filter(function(data){
        return !data.startsWith("-");
    });
    if(files.length == 0){
        console.log("Please specify a file name to read:");
        return;
    }
    for(i in files){
        if(!fs.existsSync(files[i])){
            console.log(files[i]+" does not exist.");
            return;
        }
    }
    if(options.includes("-w")){
            if(options.length!=1 || files.length!=2 || cmds.indexOf("-w")!=1){
                console.log("Command not found");
                return;
            }
            let data=fs.readFileSync(files[0],"utf-8");
            fs.writeFileSync(files[1],data);
            return;
    }
    if(options.includes("-a")){
        if(options.length!=1 || files.length!=2 || cmds.indexOf("-a")!=1){
            console.log("Command not found");
            return;
        }
        let mota=fs.readFileSync(files[1],"utf-8");
        let data=fs.readFileSync(files[0],"utf-8");
        fs.writeFileSync(files[1],data+mota);
        return;
    }
    if(options.includes("-ws")){
        if(options.length!=1 || files.length!=2 || cmds.indexOf("-ws")!=1){
            console.log("Command not found");
            return;
        }
        
        let data=fs.readFileSync(files[0],"utf-8");
        console.log(data);
        let mot=data.split("\r\n");
        let data2="";
        for(i in mot){
            if(mot[i]!=""){
                data2+=mot[i]+'\n';
            }
            
        }
        
        fs.writeFileSync(files[1],data2);
        
        
        return;
    }

    let cnt = 1;
    for(i in files){
        let data = fs.readFileSync(files[i],"utf-8");
        let allText = "";
        if(options.includes("-s")){
            let lines = data.split("\r\n");
            for( j in lines){
                if(lines[j]!=""){
                    allText += lines[j]+"\n";
                }
            }
        }
        else{
            allText = data;
        }
        if(options.includes("-n")){
            let numlines = allText.split("\n");
            for(k in numlines){
               
                console.log(cnt+" "+numlines[k]);
                cnt++;
               
            }
        }else if(options.includes("-b")){
            let numline = data.split("\r\n");
            for(k in numline){
               if(numline[k]!=""){
                   
                console.log(cnt+" "+numline[k]);
                cnt++;
               }
                
               
            }
        }
        else{
            console.log(allText);
        }
    }
}

wcat(cmds);