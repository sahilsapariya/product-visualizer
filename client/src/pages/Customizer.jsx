import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components/index.js";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('')
  const [generatingImg, GeneratingImg] = useState(false)

  const [activeEditorTab, setactiveEditorTab] = useState("")
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "aipicker":
        return <AIPicker />
      case "filepicker":
        return <FilePicker />
      default:
        return null;
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setactiveEditorTab(tab.name)} />
                ))}


            {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              handleClick={() => (state.intro = true)}
              customStyles={"font-bold text-sm"}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleClick={() => setactiveFilterTab(tab.name)}
              />
            ))}

            {generateTabContent()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
