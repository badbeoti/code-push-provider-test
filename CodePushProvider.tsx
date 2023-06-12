import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import CodePush, {CodePushOptions} from 'react-native-code-push';

const CodePushContext = createContext({status: 0, progress: 0, label: ''});
export const useCodePush = () => useContext(CodePushContext);

const CodePushProvider = ({
  options,
  children,
}: {
  options?: CodePushOptions;
  children: ReactNode;
}) => {
  const [status, setStatus] = useState(5);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    (async () => {
      await CodePush.sync(
        options,
        status => {
          setStatus(status);
        },
        progress => {
          console.log(
            'progress',
            progress.receivedBytes +
              ' of ' +
              progress.totalBytes +
              ' received.',
          );
          setProgress(
            parseInt(
              ((progress.receivedBytes / progress.totalBytes) * 100).toFixed(0),
              10,
            ),
          );
        },
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await CodePush.getUpdateMetadata();
        console.log(res);

        if (res && res.label) {
          setLabel(res.label);
        }

        return;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <CodePushContext.Provider
      value={{status: status, progress: progress, label: label}}>
      {children}
    </CodePushContext.Provider>
  );
};

export default CodePush({checkFrequency: CodePush.CheckFrequency.MANUAL})(
  CodePushProvider,
);
