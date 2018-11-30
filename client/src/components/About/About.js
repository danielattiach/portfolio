import React, { useEffect } from 'react'
import { Progress } from 'reactstrap';
import '../../css/about.css';
// push test
export default () => {

  useEffect(() => {
    document.title = 'About';
  }, []);

  const js = 'JavaScript';

  return (
    <div className="mx-auto" style={{marginTop: "75px", width: "75%"}}>
      <h3 className="text-center" >Daniel Attiach</h3>
      <div className="mx-auto" style={{width: "75%"}}>
      <div className="mt-2 mb-2">{js}: <Progress value={80} barClassName="js-bar" /></div>
      <div className="mt-2 mb-2">Node.js: <Progress value={70} barClassName="node-bar" /></div>
      <div className="mt-2 mb-2">React: <Progress value={70} barClassName="react-bar" /></div>
      <div className="mt-2 mb-2">HTML: <Progress value={85} barClassName="html-bar" /></div>
      <div className="mt-2 mb-2">CSS: <Progress value={80} barClassName="css-bar" /></div>
      <div className="mt-2 mb-2">Python: <Progress value={80} barClassName="python-bar" /></div>
      <div className="mt-2 mb-2">Django: <Progress value={30} barClassName="django-bar" /></div>
      </div>
    </div>
  )
}
