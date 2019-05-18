import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30),
        Icon.getImageSource("md-options", 30)

    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "knitrino.UserInputScreen",
                    label: "Resize",
                    title: "Resize",
                    icon: sources[3],
                    id: "resizeToggle",
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[0],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                // {
                //     screen: "knitrino.BodyScreen",
                //     label: "Body Steps",
                //     title: "Body Steps",
                //     icon: sources[0],
                //     navigatorButtons: {
                //         leftButtons: [
                //             {
                //                 icon: sources[2],
                //                 title: "Menu",
                //                 id: "sideDrawerToggle"
                //             }
                //         ]
                //     }
                // },
                // {
                //     screen: "knitrino.SummaryScreen",
                //     label: "Summary",
                //     title: "Summary",
                //     icon: sources[0]
                // }
            ],
            // drawer: {
            //     left: {
            //         screen: "knitrino.SummaryScreen",
            //         passProps: {}
            //     }
            // }
        });
    });
};

export default startTabs;


