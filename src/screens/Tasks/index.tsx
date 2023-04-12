var ScrollableTabView = require('clwy-react-native-scrollable-tab-view');

import ScreenContainer from 'components/General/screen-container';
import TabScreenNavBar from 'components/NavBar/tab-screen';
import CustomTabBar from 'components/Tab/custom-tabbar';
import BottomTabMenu from 'components/Task/bottom-tab';
import { useAppSelector } from 'hooks/useStore';
import React, { useState } from 'react';
import TaskList from '../../components/Task/task-list';

interface TabBarProps {
  tabs: Array<string>;
  activeTab: number;
  scrollValue: number;
  containerWidth: number;
}

export default function Tasks() {
  const listsState = useAppSelector(state => state.tasks.lists);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScreenContainer safeAreaBottom={false}>
      <>
        <TabScreenNavBar title="Tasks" />
        <ScrollableTabView
          onScroll={setActiveTab}
          style={{}}
          renderTabBar={(props: TabBarProps) => <CustomTabBar {...props} />}
          initialPage={0}
          // scrollWithoutAnimation={true}
        >
          {listsState.map((list, index) => (
            <TaskList tabLabel={list?.title} key={`${index}`} />
          ))}
        </ScrollableTabView>
        <BottomTabMenu list={listsState?.[activeTab]?.title} />
      </>
    </ScreenContainer>
  );
}
