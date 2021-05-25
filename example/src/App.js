import { useEffect, useState } from 'react';
import './App.css'
import {ScrollWrapper} from 'react-botttom-scroll'


const initData = [
  { text: 1 },
  { text: 2 },
  { text: 3 },
  { text: 4 },
  { text: 5 },
  { text: 6 },
  { text: 7 },
  { text: 8 },
  { text: 9 },
  { text: 10 },
  { text: 11 },
  { text: 12 },
];

function App() {

  const [data,setData] = useState(initData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [
        ...prevData,
        { text: Number(Math.random() * 100).toFixed(2) },
      ]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const list = data?.map((d, i) => (
    <li
      key={i}
      style={{
        padding: 20,
        margin: 1,
        backgroundColor: '#34eb83',
        textAlign: 'center',
      }}
    >
      {d.text}
    </li>
  ));

  const ds = {
    width: 500,
    height:400,
    overflowY:'auto'
  }
  return (
    <div className="App">
      <ScrollWrapper css={ds} minScroll={80} smoothBehavior>
        <ul>
          {list}
        </ul>
      </ScrollWrapper>
    </div>
  );
}

export default App;
