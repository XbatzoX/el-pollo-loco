const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud(0),
        new Cloud(720),
        new Cloud(2 * 720),
        new Cloud(3 * 720),
        new Cloud(4 * 720),
        new Cloud(5 * 720),
        new Cloud(6 * 720)
    ],
    [
        // new BackgroundObject('../assets/img/5_background/layers/air.png', -719),
        // new BackgroundObject('../assets/img/5_background/layers/3_third_layer/2.png', -719),
        // new BackgroundObject('../assets/img/5_background/layers/2_second_layer/2.png', -719),
        // new BackgroundObject('../assets/img/5_background/layers/1_first_layer/2.png', -719),

        // new BackgroundObject('../assets/img/5_background/layers/air.png', 0),
        // new BackgroundObject('../assets/img/5_background/layers/3_third_layer/1.png', 0),
        // new BackgroundObject('../assets/img/5_background/layers/2_second_layer/1.png', 0),
        // new BackgroundObject('../assets/img/5_background/layers/1_first_layer/1.png', 0),

        // new BackgroundObject('../assets/img/5_background/layers/air.png', 719),
        // new BackgroundObject('../assets/img/5_background/layers/3_third_layer/2.png', 719),
        // new BackgroundObject('../assets/img/5_background/layers/2_second_layer/2.png', 719),
        // new BackgroundObject('../assets/img/5_background/layers/1_first_layer/2.png', 719),

        // new BackgroundObject('../assets/img/5_background/layers/air.png', (719*2)),
        // new BackgroundObject('../assets/img/5_background/layers/3_third_layer/1.png', (719*2)),
        // new BackgroundObject('../assets/img/5_background/layers/2_second_layer/1.png', (719*2)),
        // new BackgroundObject('../assets/img/5_background/layers/1_first_layer/1.png', (719*2)),

        // new BackgroundObject('../assets/img/5_background/layers/air.png', (719*3)),
        // new BackgroundObject('../assets/img/5_background/layers/3_third_layer/2.png', (719*3)),
        // new BackgroundObject('../assets/img/5_background/layers/2_second_layer/2.png', (719*3)),
        // new BackgroundObject('../assets/img/5_background/layers/1_first_layer/2.png', (719*3))
        'assets/img/5_background/layers/air.png',
        'assets/img/5_background/layers/3_third_layer/2.png',
        'assets/img/5_background/layers/2_second_layer/2.png',
        'assets/img/5_background/layers/1_first_layer/2.png',
        'assets/img/5_background/layers/air.png',
        'assets/img/5_background/layers/3_third_layer/1.png',
        'assets/img/5_background/layers/2_second_layer/1.png',
        'assets/img/5_background/layers/1_first_layer/1.png'
    ],
    4,
    [
        new Coin(500, 350),
        new Coin(570, 350),
        new Coin(640, 350),

        new Coin(2000, 270),
        new Coin(2100, 220),
        new Coin(2200, 270),
        
        new Coin(2900, 250),
        new Coin(3000, 350),
        new Coin(3070, 350),
        new Coin(3170, 250)
    ]
);