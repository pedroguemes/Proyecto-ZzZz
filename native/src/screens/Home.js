import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { styles } from "../styles/styles";

import Svg1 from "../assets/Svg1";
import Svg2 from "../assets/Svg2";
import Svg3 from "../assets/Svg3";
import Svg4 from "../assets/Svg4";

const Home = () => {

    return (

        <ScrollView style={styles.contenedorFondo} >

            <View style={styles.contenedorGif}>
                <View>
                    <Image
                        source={require('../assets/lauty1.png')}
                        style={{ width: 125, height: 125, margin: 15, borderRadius: 20, position: 'absolute', left: -90, opacity: 0.5 }}
                    />

                    <Text style={styles.titulos}>#1 LARGEST NFT MARKET</Text>

                    <Text style={styles.text}>Discover, collect, and sell awesome NFTs</Text>
                    <Text style={styles.subtitulos}>ProyectZzZz is a collection with more than 4500 unique NFTs. You can easly find some NFT ProyectZzZz.</Text>
                </View>
                <View style={styles.cubo}>

                <Image
                        source={require('../assets/9778e9361fabdb7fd6eded5ec35102f5.gif')}
                        style={{ width: 200, height: 200, margin: 15, borderRadius: 20 }}
                    />
                    <View style={styles.cuboRelleno}>
                        {/* <Image
                            source={require('../assets/RoundCube-Iridescent.png')}
                            style={{ width: 25, height: 25 }}
                        />
                        <Image
                            source={require('../assets/RoundCube-Iridescent.png')}
                            style={{ width: 25, height: 25, marginTop: 35 }}
                        /> */}
                    </View>

                    {/* <Image
                        source={require('../assets/RoundCube-Iridescent.png')}
                        style={{ width: 25, height: 25, marginRight: 40 }}
                    /> */}

                    

                </View>
            </View>

            {/* <View>
                <View >
                    <Text s>Optical Ilustration Art</Text>
                        <View>
                            <Text >Ending in</Text>
                            <Text >10m 12s</Text>
                        </View>
                    </View>
                </View> */}
            <View style={styles.contenedorGif}>
                <View >
                    <Text style={styles.titulos}>WHO WE ARE</Text>
                    <Image
                        source={require('../assets/lauty2.png')}
                        style={{ width: 125, height: 125, margin: 15, borderRadius: 20, position: 'absolute', right: -100, opacity: 0.5 }}
                    />
                    <Text style={styles.text}>About us</Text>
                    <View >
                        <View>
                            <View></View>
                            <View></View>
                        </View>
                        <View>
                            <Text style={styles.subtitulos}>Building an open digital economy.</Text>
                            <View style={styles.building}>

                                <Image
                                    source={require('../assets/about.jpeg')}
                                    style={{ width: 150, height: 150, borderRadius: 15 }}
                                />
                                <Image
                                    source={require('../assets/aboutraro.png')}
                                    style={{ width: 75, height: 75, borderRadius: 15, position: 'relative', left: -30 }}
                                />
                            </View>
                            <Text style={styles.subtitulos}>At ProyectZzZz, we´re excited about a brand new type of digital good, called NFT (non-fungible token). NFTs have exciting properties: they´re unique. probably scarce, tradeable, and usable across multiple applications.</Text>
                            <Text style={styles.subtitulos}>Just like physcal goods, you can do whatever you want with them! You could throw them in the trash, gift them to a friend across the world, or go sell them on an open marketplace.</Text>
                        </View>
                        <Image
                            source={require('../assets/lauty3.png')}
                            style={{ width: 125, height: 125, margin: 15, borderRadius: 20, position: 'absolute', left: -100, opacity: 0.5 }}
                        />
                    </View>
                </View>

                <View >
                    <View>
                        <Text style={styles.titulos}>Advantages</Text>
                        <Text style={styles.subtitulos}>Create and sell your NFTs</Text>
                    </View>
                    <View style={styles.cartas}>
                        <Svg1 style={styles.svg} />
                        <Text style={styles.titulos}>Set up your wallet</Text>
                        <Text style={styles.text}>Once you've set up your wallet, connect it to ProyectZzZz by clicking the wallet icon in the top right corner. Learn about the wallets we support</Text>
                    </View>
                    <View style={styles.cartas}>
                        <Svg2 style={styles.svg} />
                        <Text style={styles.titulos}>Create your collection</Text>
                        <Text style={styles.text}>Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</Text>
                    </View>
                    <View style={styles.cartas}>
                        <Svg3 style={styles.svg} />
                        <Text style={styles.titulos}>Add your NFTs</Text>
                        <Text style={styles.text}>Upload your work, add a title and description, and customize your NFTs with properties, stats, and unlockable content.</Text>
                    </View>
                    <View style={styles.cartas}>
                        <Svg4 style={styles.svg} />
                        <Text style={styles.titulos}>List them for sale</Text>
                        <Text style={styles.text}>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!</Text>
                    </View>
                </View>

                <Text style={styles.textCreator}>Creators</Text>
                <Text style={styles.topCollections}>Top Collections of the week</Text>

                <View style={styles.containerCollections}>

                    <Image
                        source={require('../assets/manimage.jpg')}
                        style={{ width: 200, height: 200, borderRadius: 15, position: 'relative', left: 50, marginTop: 30 }}
                    />
                    <Text style={styles.textUserName}>UserName</Text>
                    <Text style={styles.textPrice}>Price</Text>
                    <Text style={styles.textDescription}>The NFT & Defi farming initiative built on Ethereum (ETH) blockechain in OpenBid</Text>


                    <Image
                        source={require('../assets/woman1.jpg')}
                        style={{ width: 200, height: 200, borderRadius: 15, position: 'relative', left: 50, marginTop: 30 }}
                    />
                    <Text style={styles.textUserName}>UserName</Text>
                    <Text style={styles.textPrice}>Price</Text>
                    <Text style={styles.textDescription}>The NFT & Defi farming initiative built on Ethereum (ETH) blockechain in OpenBid</Text>

                    <Image
                        source={require('../assets/woman2.jpg')}
                        style={{ width: 200, height: 200, borderRadius: 15, position: 'relative', left: 50, marginTop: 30 }}
                    />
                    <Text style={styles.textUserName}>UserName</Text>
                    <Text style={styles.textPrice}>Price</Text>
                    <Text style={styles.textDescription}>The NFT & Defi farming initiative built on Ethereum (ETH) blockechain in OpenBid</Text>

                </View>
            </View>


        </ScrollView>

    )
};


export default Home
