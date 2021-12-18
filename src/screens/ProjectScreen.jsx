import { useState } from "react";
import { useParams } from "react-router-dom";
import projectData from "../data.js"
import ProjectCard from "../components/ProjectCard.js"

function filterProjects(tagToSearch){

    if(tagToSearch.toLowerCase() === "all"){
        return projectData;
    }

    var filteredSet = [];
    for(var i=0 ; i< projectData.length; i++){
        if(projectData[i].tag.includes(tagToSearch.toLowerCase())){
            filteredSet.push(projectData[i]);
        }
    }

    return filteredSet;
}

function latestTool(){
    
    var latestToolArr = [];
    // console.log("p:" + projectData[projectData.length -1].tag)
    latestToolArr = projectData[projectData.length -1].tag;
    return latestToolArr;
}  


export default function ProjectScreen(props) {

    const {tag} = useParams();
    console.log("the tag is: "+ tag);

    let initialTag = tag? tag: "All";

    const [emptyFlag, setEmptyFlag] = useState(false);
    const [tagToSearch, setTagToSearch] = useState(initialTag);
    const [filteredProj, setFilteredProj] = useState(filterProjects(tagToSearch));
    //const [latestTool, setLatestTool] = useState("php");

    function handleChange(e){
        console.log(e.target.value);
        console.log("bfore:"+tagToSearch);
        setTagToSearch(e.target.value);
        console.log("after:"+tagToSearch);
    }

    function submitFilterReq(e){
        
        if(e.keyCode ===13){
        console.log("final:" + tagToSearch);
        console.log(filterProjects(tagToSearch));
        if(!filterProjects(tagToSearch).length){
            setEmptyFlag(true);
        }else{
            setEmptyFlag(false);
        }
        setFilteredProj(filterProjects(tagToSearch));
    }
}

function submitFilterReqAll(e){
    
    setFilteredProj(projectData);

}

    var latestToolArr = latestTool();
    

    return (
    
<div>
<div id="mainProjectContent">

    <p>Search for a particular skill 🔎</p>
    <input onKeyDown={submitFilterReq} id="projectSInput" type="text" onChange = {handleChange} placeholder="Enter a Tool/TechStack Tag" value= {tagToSearch} />

<button id="buttonProject" onClick={submitFilterReqAll}>View All Projects</button>
      
<div id="projectsGridParent">
{emptyFlag? 
<p>No matching project. :( </p> : 

<div id="projectsGrid">
{filteredProj.map((curP) =>{

return <ProjectCard key= {curP.id} project = {curP}/>;

})
} 
</div>
}

</div>  {/* close of projectsGrid */}


</div> {/* close of mainProjectContent */}



</div> 

    )
}


//         {/* <div>
//         <h2>Currently Playing around with: </h2>
//     {
//         latestToolArr.map((curLT)=>{
//             return <li>{curLT}</li>
//         })
//     }
// </div> */}