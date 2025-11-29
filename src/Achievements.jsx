import { useState, useEffect} from 'react'
import './Achievements.css';

function Achievements ({userId}) {

   const [achievements, setAchievements] = useState([])

   async function grabAchievements(){

     const res = await fetch(`http://localhost:5000/achievements?userId=${userId}`)
     const data = await res.json()

     setAchievements(data)

   }

   useEffect(() => {
     grabAchievements()
   }, [])

   if (!achievements){

      return <p> Loading the achievements </p>

   }

   if (achievements.length == 0)
   {
      return (
          <div
             className = 'achievements-main'
             style =
             {{
               backgroundImage: "url('/assets/Project3Selection.png')",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "center",
               width: "100%",
               minHeight: "100vh"
             }}
          >
          <div className = 'achievements-header'>
              <h1> Achievements </h1>
          </div>
          <p className = 'no-achievements'> No Achievements unlocked yet </p>
          </div>
      )
   }

   return (
       <div
       className = 'achievements-main'
       style =
       {{
         backgroundImage: "url('/assets/Project3Selection.png')",
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
         width: "100%",
         minHeight: "100vh"
       }}
       >

       <div className = 'achievements-header'>
           <h1> Achievements </h1>
       </div>

       <div className = 'achievements-layout'>
           {achievements.map((achievement) => (
               <div key = {achievement.id} className = 'achievement-card'>
                   <img
                   className = 'achievement-image'
                   src = {achievement.img}
                   alt = {achievement.name}
                   />
                   <h3 className = 'achievement-title'> {achievement.name} </h3>
                   <p className = 'achievement-description'> {achievement.description} </p>
               </div>
               ))}
       </div>
       </div>
   )

}

export default Achievements