import React from 'react';
import NavbarAdmin from './NavbarAdmin';

const MyDashboard =() => {
  const items = [
    { title: 'Create Paper', icon: 'generate-paper.png' }, // Replace with your icon paths
    { title: 'My Papers', icon: 'my-papers.png' },
    { title: 'My Questions', icon: 'my-questions.png' },
    { title: 'Blueprints', icon: 'blueprints.png' },
  ];

  return (
    <>
    {/* <NavbarAdmin /> */}
    <div className="dashboard">
      <h1 className="dashboard-title">Exams</h1>
      <div className="dashboard-items">
        {items.map((item, index) => (
          <div className="dashboard-item" key={index}>
            <img src={item.icon} alt={item.title} className="item-icon" />
            <div className="item-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default MyDashboard;

// const MyDashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <div className="header">
//         {/* Replace with your logo/image */}
//         <img src="your-logo.png" alt="360 Exams Logo" className="logo" /> 
//         <div className="header-right">
//           {/* Replace with your icons/user info */}
//           <div className="icon"></div>
//           <div className="user">Yash...</div>
//         </div>
//       </div>

//       <div className="content">
//         <div className="banner">
//           <div className="banner-content">
//             <h1>MICRO-SCHOLARSHIP PROGRAMME</h1>
//             <p>Powered By AURO SCHOLAR</p>
//             <h2>PARTICIPATE NOW TO GET MONTHLY MICRO-SCHOLARSHIP</h2>
//             <button className="join-now-btn">Join Now</button>
//           </div>
//           <div className="banner-images">
//             {/* Replace with your hexagon images */}
//             <div className="hexagon"></div>
//             <div className="hexagon"></div>
//             <div className="hexagon"></div>
//           </div>
//         </div>

//         <div className="stats">
//           <div className="stat-item">
//             <div className="stat-value">9</div>
//             <div className="stat-label">Total Board</div>
//             <button className="stat-btn">+ Records</button>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">46</div>
//             <div className="stat-label">Total Standard</div>
//             <button className="stat-btn">+ Standard</button>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">301350</div>
//             <div className="stat-label">Total Questions</div>
//             <button className="stat-btn">+ Questions</button>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">21</div>
//             <div className="stat-label">Total Videos</div>
//             <button className="stat-btn">+ Videos</button>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">4658</div>
//             <div className="stat-label">Question Types</div>
//             <button className="stat-btn">+ Question Types</button>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">23</div>
//             <div className="stat-label">My Points</div>
//             <button className="stat-btn">+ Paper Points</button>
//           </div>
//         </div>

//         {/* <div className="school-join">
//           <input type="text" placeholder="Ex 123456" />
//           <button className="join-school-btn">Join now</button>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default MyDashboard;