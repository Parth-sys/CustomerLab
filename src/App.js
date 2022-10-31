import logo from './logo.svg';
import './App.css';
import 'bootstrap'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react';
import  Select from 'react-select'
import axios from 'axios'
function App() {


  const options=[
     
    { value: "first_name", lable:"Firstname",},
     { value:"last_name",lable:"lastname"},
      {  value:"age",lable:"age"},
      { value:"gender",lable:"gender"},
      {value:"account_name",lable:"accountname" },
     {  value:"city",lable:"city"},
     {  value:"state",lable:"state"}

  ]

 
             


  const [show,setshow]=useState(false)
  const [segment_name,setsegment_name]=useState("");
  const [select ,setselect]=useState({});
   





   const [schema,setschema]=useState([]);

  const handleshow=()=>{
     
     
   setshow(true)
 };
 const handleClose=()=>(setshow(false))



 const handleChange=(e)=> {
  var value= e.target.value;
  const optionvalue = options.find(u => u.value == value);
  setselect(
     optionvalue
  );
  console.log(select)
}






const Register=async()=>{
 

     
       
        try {
          var res= await axios.post("https://webhook.site/a8d6ac7a-efd9-4314-b821-f838dcbf3188",{
           segment_name,
           schema
          })
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      
    
}


const reset=()=>{
  var s=document.getElementById("select");
  s.selectedIndex=0;
}


const plus=()=>{
      
  
      var a=[...schema,select]
      setschema(a)
      console.log(a)
       reset()
      
      
}



  


     const optionList =options.map((k,i) => {
    
        return (
          <option key={i} value={options[i].value}>{options[i].lable}</option>
        )
        
      })




     return (




    <div className="App">
     
     <button className=" btn btn-default m-2"      onClick={()=>handleshow()}>Save Segment</button>


<Modal show={show}   >
<Modal.Header closeButton onClick={handleClose}  style={{backgroundColor:'skyblue'}}>
    <Modal.Title  >saving segment</Modal.Title>
</Modal.Header>
  

<Modal.Body>
 
 <div>
  

 <label className="lable "> Enter the name of the segment</label>
<input className="form-control" type="text" placeholder="name"  value={segment_name}
 onChange={(e)=>{setsegment_name(e.target.value)}} ></input><br/>

<label className="lable "> To save your segment,you need to add schemas to your query</label>
  <div className="listdiv"  >
  
    
     {schema.map((v,i)=>{
      //console.log(v.lable)
      return<div className='d'>    
      <ul>
       <li className='list'>
         <select   className='form-select '   defaultValue={v.lable}     onChange={ handleChange}>
             {optionList}
      </select>
      </li>
      </ul>
      </div>
      
    
     })}
      
    
  </div>

   
  
 <select id="select" name="select"   onChange={handleChange}  >
    <option value="none" selected disabled >add new segment</option>
     {optionList}
    </select><br/>
    
  <a   onClick={()=>plus()}  className="link">  +add new schema</a>
 </div>
</Modal.Body>

<Modal.Footer>
    <button  className=" btn-1"  onClick={()=>{Register()}} >save segment</button>
    <button className="btn-2" onClick={handleClose}> cancel</button>

</Modal.Footer>
</Modal>

   
  </div>






  );
}

export default App;
