import classes from "./loadingMask.module.scss";

export default function LoadingMask() {
  return (
    <div className={classes.component}>
      <img src="/static/loading.gif" alt="" />
    </div>
  );
}
