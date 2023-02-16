import React, {forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import {withFetch} from '@kne/react-fetch';
import useEvent from "@kne/use-event";
import {hooks} from '../helper';

const {useOnChange} = hooks;

const withFetchList = (WrappedComponent) => {
  const FieldInner = withFetch(({
                                  data,
                                  setData,
                                  refresh,
                                  reload,
                                  fetchEmitter,
                                  isLoading,
                                  children,
                                  onLoaded,
                                  ...props
                                }) => {
    const refreshRef = useRef(refresh);
    refreshRef.current = refresh;
    const reloadRef = useRef(reload);
    reloadRef.current = reload
    const setDataRef = useRef(setData);
    setDataRef.current = setData;
    const dataRef = useRef(data);
    useEffect(() => {
      const token1 = fetchEmitter.addListener('select-fetch-refresh', () => refreshRef.current());
      const token2 = fetchEmitter.addListener('select-fetch-reload', () => reloadRef.current());
      const token3 = fetchEmitter.addListener('select-fetch-set-data', () => setDataRef.current());
      return () => {
        token1 && token1.remove();
        token2 && token2.remove();
        token3 && token3.remove();
      };
    }, [fetchEmitter]);
    useEffect(() => {
      onLoaded && onLoaded(dataRef.current);
    }, []);
    return <WrappedComponent {...props} {...children({data, refresh, isLoading, setData})}/>;
  });

  const FetchComponent = forwardRef((props, ref) => {
    const fetchEmitter = useEvent();
    useImperativeHandle(ref, () => {
      return {
        refresh: () => fetchEmitter.emit('select-fetch-refresh'),
        reload: () => fetchEmitter.emit('select-fetch-reload'),
        setData: (data) => fetchEmitter.emit('select-fetch-set-data', data)
      };
    }, [fetchEmitter]);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props, {fetchEmitter}));
    return render(FieldInner);
  });

  return FetchComponent;
};

export default withFetchList;
