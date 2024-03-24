import { useEffect, useState} from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { showError } from './utils/utils';
import { rawFileAtom, messagesAtom } from './stores/global';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import Welcome from './components/Welcome/Welcome';
import * as S from './style';


function App() {
  const messages = useAtomValue(messagesAtom);
  const setRawFile = useSetAtom(rawFileAtom);

  const [showWelcome, setShowWelcome] = useState(true); // State to control rendering of Welcome component

  const handleWelcomeComplete = async () => {
    setShowWelcome(false); // Once Welcome is complete, set showWelcome to false
    try{
      const exampleChat = await fetch('/src/assets/chat.zip');
      const zipBolb = await exampleChat.blob();
      const zipFile = new File([zipBolb], 'chat.zip', { type: 'application/zip' });
      processFile(zipFile);
    }catch(error){
      console.log("error while fetching the file.")
    }
  };

  const processFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('loadend', e => {
      if (e.target) {
        setRawFile(e.target.result);
      }
    });
    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) =>
      document.documentElement.classList.toggle('ctrl-down', e.ctrlKey);

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyHandler);
    };
  }, []);

  return (
    <>
      {showWelcome ? (
        <Welcome onComplete={handleWelcomeComplete} />
      ) : (
        <>
          <S.GlobalStyles />
          <S.Container>
            <S.Header>
              <h1>Welcome bae! </h1>
            </S.Header>
            <MessageViewer />
            {messages.length > 0 && <Sidebar />}
          </S.Container>
        </>
      )}
    </>
  );
}

export default App;
