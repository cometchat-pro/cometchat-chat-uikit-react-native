import React, { useState, useEffect } from 'react'
import { FlatList, Image, ListRenderItemInfo, TouchableOpacity, View, Text, Dimensions, ViewProps, TextStyle } from 'react-native'
import { CometChatTabAlignment } from '../shared/base/Types'
import { CometChatContext } from '../shared'
import { TabItem } from './TabItems'
import { CometChatTabsStyle, CometChatTabsStyleInterface } from './CometChatTabsStyle'
import { TabItemStyle } from "./TabItemStyle";

const { width: screenWidth } = Dimensions.get("window");

type ViewType = {
    view: () => JSX.Element,
    id: string| number,
    isActive: boolean
}

export interface CometChatTabsInterface {
    tabAlignment?: CometChatTabAlignment,
    tabs: Array<TabItem>,
    keepAlive?: boolean,
    style?: CometChatTabsStyleInterface
}

export const CometChatTabs = (props: CometChatTabsInterface) => {
    const {
        style,
        keepAlive = false,
        tabAlignment = "bottom",
    } = props;
    
    const { theme } = React.useContext(CometChatContext);

    const [views, setViews] = useState<Array<ViewType>>([]);
    const [tabs, setTabs] = useState(props.tabs);

    const loadActiveTab = () => {
        props.tabs.forEach((tabItem) => {
            tabItem.isActive ? setViews([{ view: tabItem.childView, id: tabItem.id, isActive: true }]) : null
        })
    }

    useEffect(() => {
        setTabs(props.tabs);
        loadActiveTab();
    },[props.tabs]);

    useEffect(() => {
        loadActiveTab();
    }, [])

    const getStyleFor = (tab: TabItem) => {
        const {
            activeBackgroundColor,
            activeIconTint,
            activeTitleTextColor,
            activeTitleTextFont,
            iconTint,
            titleTextColor,
            titleTextFont,
            backgroundColor,
            border,
            borderRadius,
            height = 36,
            width
        } = new TabItemStyle({
            height: 36,
            titleTextColor: style?.tabTitleTextColor || theme?.palette.getAccent(),
            titleTextFont: style?.tabTitleTextFont || theme?.typography.body,
            activeIconTint: theme?.palette.getPrimary(),
            activeTitleTextColor: style?.activeTabTitleTextColor || theme?.palette.getSecondary(),
            activeBackgroundColor: style?.activeTabBackgroundColor || theme?.palette.getPrimary(),
            iconTint: theme?.palette.getAccent600(),
            activeTitleTextFont: theme?.typography.body,
            borderRadius: style?.borderRadius,
            ...tab.style
        });

        return {
            height,
            width: tabs.length <= 4 ? (screenWidth - 30) / tabs.length : width,
            border: tab.isActive ? style?.activeTabBorder : undefined,
            borderRadius: style?.borderRadius,
            backgroundColor: tab.isActive ? activeBackgroundColor : "transparent",
            tintColor: tab.isActive ? activeIconTint : iconTint,
            color: tab.isActive ? activeTitleTextColor : titleTextColor,
            titleFont: tab.isActive ? activeTitleTextFont : titleTextFont,
            ...border
        };
    }

    const tabItemPressed = (item: TabItem) => {
        let newTabState = tabs.map((tabItem) => {
            return {
                ...tabItem,
                isActive: tabItem.id == item.id ? true : false
            }
        });
        if (keepAlive) {
            let alreadyLoaded = views.findIndex((view) => view.id == item.id);
            let newViews: any[] = [];

            if (alreadyLoaded >= 0) {
                newViews = views.map((vw, index) => {
                    vw.isActive = index == alreadyLoaded
                    return vw;
                })
            } else {
                newViews = views.map(vw => {
                    vw.isActive = false;
                    return vw;
                });
                newViews.push({
                    view: item.childView,
                    id: item.id,
                    isActive: true
                });
            }
            setViews(newViews);
        } else {
            setViews([{
                id: item.id,
                isActive: true,
                view: item.childView
            }]);
        }
        setTabs(newTabState);
    }

    const TabItemView = ({ item }: {item: any}) => {
        let style = getStyleFor(item);

        return (
            <TouchableOpacity
                style={[style, { justifyContent: "center", alignItems: "center" }] as ViewProps}
                onPress={() => tabItemPressed(item)}
            >
                {
                    item.icon && <Image source={item.icon} style={{ tintColor: style.tintColor }} />
                }
                {
                    item.title && <Text style={{ color: style.color, ...style.titleFont } as TextStyle}>{item.title}</Text>
                }
            </TouchableOpacity>
        );
    }

    const TabsList = () => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: style?.backgroundColor, borderRadius: style?.borderRadius, margin: 15, marginTop: 0}}>
                { tabs.map(item=> <TabItemView item={item}/>) }
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{display: tabAlignment == 'bottom' ? "none" : "flex"}}>
                {
                    tabAlignment == "top" && <TabsList />
                }
            </View>
            <View style={{ flex: 1 }}>
                {
                    views.map(vw => {
                        return vw.isActive ? <View key={vw.id} style={{flex:1}}>
                            {vw.view()}
                        </View> : null
                    })
                }
            </View>
            <View style={{display: tabAlignment == 'bottom' ? "none" : "flex"}}>
                {
                    tabAlignment == "bottom" && <TabsList />
                }
            </View>
        </View>
    )
}