// Keep import 'icon.png';
// It allows to include icon.png to skill.zip without any other scripts.
import './icon.png';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BackgroundContent} from '@matterway/background-react/content';
import {createSkillMountRoot} from 'library/components/create-skill-mount-root';
import {Root as DesignSystemRoot} from '@matterway/assistant-design-system/content';
import * as contentComponents from 'components';
import manifest from 'manifest.json';


const reactMountRoot = createSkillMountRoot({
  identifier: manifest.identifier,
  onDestroy: ReactDOM.unmountComponentAtNode
});

ReactDOM.render(
  <DesignSystemRoot styleSheetTarget={reactMountRoot}>
    <BackgroundContent
      portName={`skill-${manifest.identifier}`}
      chromeRuntime={chrome.runtime}
      contentComponents={contentComponents}
    />
  </DesignSystemRoot>,
  reactMountRoot
);
