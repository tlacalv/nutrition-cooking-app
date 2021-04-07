import HeaderView from './HeaderView.js';
import LinearLoader from './LinearLoader'

export default function ViewLayout(props) {
  return (
    <div className="layout">
      <header>
        <HeaderView title={props.title} subtitle={props.subTitle} /> 
      </header>
      {props.loading && <LinearLoader />}
      <div>
        {props.children}
      </div>
    </div>
  );
}
