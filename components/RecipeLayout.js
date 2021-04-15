import HeaderView from './HeaderView.js';
import LinearLoader from './LinearLoader'
import style from '../styles/sass/recipe.module.scss';

export default function RecipeLayout({children, ...props}) {

  const headCard = children.find?.((child) => child.type === 'section');
  const newChildren = children.filter?.((child) => child.type !== 'section');

  return (
    <div className="alternate_layout">
      <header className={style.header}>
        <HeaderView secondary title={props.title} subtitle={props.subTitle} /> 
        {headCard}
      </header>
      {props.loading && <LinearLoader />}
      <div className={style.body}>
        {newChildren}
      </div>
    </div>
  );
}
