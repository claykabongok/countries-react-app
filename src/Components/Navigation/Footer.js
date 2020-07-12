import React from "react";
import "../../Styles/Footer.scss";

export default function Footer() {
  var date = new Date();
  var dateyear = date.getFullYear();
  return (
    <div>
      <div className="page-footer">
        <p>Copyright &copy; {dateyear}. All Right reserved.</p>
        <hr />
      </div>
    </div>
  );
}
