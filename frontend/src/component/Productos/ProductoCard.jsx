import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
const ProductCard = ({ producto }) => {
  const options = {
    value: producto.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <>
      <Link className="ProductCard" to={`/producto/${producto._id}`}>
            <img
              src={producto.imagenes[0].url}
              alt={producto.nombre}
              className="ProductImg"
            />
            <p className="productName">{producto.nombre}</p>
            <div>
            <Rating {...options} />
              <span>({producto.numerodeResenas} Resenas)</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="offerPriceBox">
                <h1
                  className="discountPrice"
                  style={{
                    paddingLeft: "2.5vmax",
                    fontSize: ".9vmax",
                    paddingBottom: "0",
                  }}
                >
                  {producto.descuento > 0 ? `$${producto.descuento}` : ""}
                </h1>
                <span className="p__Price">{`$${producto.precio}`}</span>
              </div>
            </div>
          </Link>
    </>
  );
};

export default ProductCard;