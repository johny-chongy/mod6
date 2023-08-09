import React, { useState, useEffect } from "react";
import { DEFAULT_SETTINGS } from "./Settings";
import { DEFAULT_STATE } from "./Game";

/** useLocalStorage returns [localStorageVal (state), setLocalStorageVal]
 *  in order to abstract all the changes within the LocalStorage
 *
 *  Gets called every time states within game changes.
*/

interface DefaultMap {
    'settings': object,
    'gameState': object
}

const DEFAULT_VALUES: DefaultMap = {
    'settings': DEFAULT_SETTINGS,
    'gameState': DEFAULT_STATE
}

function useLocalStorage(key: keyof DefaultMap): [string, React.Dispatch<React.SetStateAction<string>>] {

    const localVal = localStorage.getItem(key) || '';
    const [localStorageVal, setLocalStorageVal] = useState(localVal);

    useEffect(function checkLocalStorage() {
        if (localStorageVal === '') {
            localStorage.setItem(key, JSON.stringify(DEFAULT_VALUES[key]));
    }
        localStorage.setItem(key, localStorageVal);
  }, [key, localStorageVal]);

  return [localStorageVal, setLocalStorageVal];
};

export default useLocalStorage;