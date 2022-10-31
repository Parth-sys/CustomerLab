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
  
  const [email,setemail]=useState("");
  const [segment_name,setsegment_name]=useState("");
  const [select ,setselect]=useState({});
   const [Firstname,setFirstname]=useState("first_name")
   const [lastname,setlastname]=useState("last_name")
   const [gender,setgender]=useState("gender")
   const [age,setage]=useState("age")
   const [city,setcity]=useState("city")
   const [accountname,setaccountname]=useState("account_name")
   const [state,setstate]=useState("state")
   const [data,setdata]=useState({});





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
      if(schema.length==0){
      alert("please select option")
      }
      if(schema!==0){
  //console.log(schema)
      var a=[...schema,select]
      setschema(a)
      console.log(a)
       reset()
      
      }
}


{/*
const Add=()=>{
  var s=[];
  Object.keys(s).map((v)=>{
    console.log(s[v])
    })
   schema.map((v)=>{
    return 
       <div>{v}</div>
    
  }
}  
  

*/}


    

   
  //   const optionList =Object.keys(options).map((k) => {
     // console.log(options)
       //return (
       //  <option key={k} value={options[k].value}>{options[k].lable}</option>
     //  )
       
   //  })


     const optionList =options.map((k,i) => {
      // console.log(options)
        return (
          <option key={i} value={options[i].value}>{options[i].lable}</option>
        )
        
      })




     return (




    <div className="App">
     
     <button className=" btn m-2"      onClick={()=>handleshow()}>Save Segment</button>


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
  <div classname="d-flex"  style={{border:"1px solid skyblue" , width:"400px",display:"flex",flexDirection:"column"}} >
  
    
     {schema.map((v,i)=>{
      console.log(v.lable)
      return   <select   className='form-select' key={i}   defaultValue={v.lable}     onChange={ handleChange}>
             {optionList}
      </select>
      
    
     })}
      
    
  </div>

   
  
 <select id="select" name="select" style={{margin:"50px"}}   onChange={handleChange}  >
    <option value="none" selected disabled >add new segment</option>
     {optionList}
    </select><br/>
    
  <a   onClick={()=>plus()}  className="link">  +add new schema</a>
 </div>
</Modal.Body>

<Modal.Footer>
    <button  className="btn"  onClick={()=>{Register()}} >save segment</button>
    <button className="btn" onClick={handleClose}> cancel</button>

</Modal.Footer>
</Modal>

   
  </div>






  );
}

export default App;
