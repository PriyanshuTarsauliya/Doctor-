const fs=require('fs');

function w(d){
  let r=[];
  fs.readdirSync(d).forEach(f=>{
    f=d+'/'+f;
    if(fs.statSync(f).isDirectory()) r=r.concat(w(f));
    else if(f.endsWith('.tsx')) r.push(f);
  });
  return r;
}

w('src/app').forEach(f=>{
  let c=fs.readFileSync(f,'utf8');
  let original = c;
  c=c.replace(/Dr\. Jane Smith/g,'Dr. Gunja Gupta')
     .replace(/Jane Smith/gi,'Gunja Gupta')
     .replace(/>Jane</g,'>Gunja<')
     .replace(/>JS</g,'>GG<')
     .replace(/\"JS\"/g,'\"GG\"')
     .replace(/hello@drjanesmith\.com/g,'hello@drgunjagupta.com')
     .replace(/Dr\. Smith/g,'Dr. Gupta');
  
  if (original !== c) fs.writeFileSync(f,c);
});
console.log('Done replacing names.');
