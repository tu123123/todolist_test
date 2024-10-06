import loadingsvg from "../assets/loading.svg";
import "./loading.scss";
export function Loading() {
  return (
    <div className="loading-container">
      <img src={loadingsvg}></img>
    </div>
  );
}
