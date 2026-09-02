//CJS — log() function export karo jo timestamp ke saath message print

let log=(message)=>{
    let timestamp=new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

module.exports={log};