import React from 'react';
import { packages } from '../../Assets/Mocks/admin.mock';
import NavbarAdmin from './NavbarAdmin';

const PurchasePackage = () => {
  
    return (
        <>
        <NavbarAdmin />
        <div className="container-a">
          <h2 className="header">Purchase Package</h2>
          <div className="grid">
            {packages.map((pkg, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{pkg.title}</h3>
                {pkg.credits && <p className="card-credits">{pkg.credits}</p>}
                <p className="card-text">POINTS {pkg.points}</p>
                <p className="card-text">VALIDITY {pkg.validity}</p>
                <p className="card-text">EXTRA VALIDITY {pkg.extraValidity}</p>
                <p className="card-text">PRICE {pkg.price}</p>
                <button className="button">Buy Now</button>
              </div>
            ))}
          </div>
        </div>
        </>
      );
    };

export default PurchasePackage;