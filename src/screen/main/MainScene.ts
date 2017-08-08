class MainScene extends BaseScreen {

	private static _instance: MainScene;

	private _mainPanel: fairygui.GComponent;

	// private _topBar: fairygui.GComponent;

	public constructor() {
		super();

		this._mainPanel = Main.createPanel('登录的页面');
		// this._topBar = this._mainPanel.getChild('n13').asCom;
		// this._topBar.getChild('n14').addClickListener(() => {
		// 	PayPanel.instance.show();
		// }, this);

		// 进入关卡的按钮
		this._mainPanel.getChild('n4').addClickListener(this._onEnterLevelScreen, this);
		this._mainPanel.getChild('n5').addClickListener(this._onEnterLevel2Screen, this);
		// 打开兑换码的面板
		this._mainPanel.getChild('n0').addClickListener(this._onRedeemCode, this);
		// 打开活动面板
		this._mainPanel.getChild('n1').addClickListener(this._onActivity, this);
		// 打开设置面板
		this._mainPanel.getChild('n2').addClickListener(this._onSetting, this);
		// 打开商店
		this._mainPanel.getChild('n6').addClickListener(this._onShop, this);
		// 打开兑换礼品的面板
		this._mainPanel.getChild('n15').addClickListener(this._onGift, this);

		LoginAwardPanel.instance.addEventListener(egret.Event.CLOSE, this.updateDollar, this);
	}

	updateDollar(): void {
		// this._topBar.getChild('n2').text = LocalStorage.getItem(LocalStorageKey.dollar).toString();
	}

	reset(): void {
		fairygui.GRoot.inst.removeChildren();
		fairygui.GRoot.inst.addChild(this._mainPanel);

		// this._topBar.getChild('n2').text = LocalStorage.getItem(LocalStorageKey.dollar).toString();
		// this._topBar.getChild('n4').text = Util.getLv().toString();
		// this._topBar.getChild('n7').text = LocalStorage.getItem(LocalStorageKey.maxTotalScore).toString();
		// const expBar = this._topBar.getChild('n9').asProgress;
		// const progress = Util.getExpProgress();
		// expBar.max = progress.max;
		// expBar.value = progress.val;

		egret.Tween.get(this).wait(500).call(() => {
			// 判断一下是否应该弹出每日登录的奖励面板
			const fetchLoginAwardCount = LocalStorage.getItem(LocalStorageKey.fetchLoginAwardCount);
			// 领了7次以上，那就不弹窗了
			if (fetchLoginAwardCount < 7) {
				const lastFetchLoginAwardTime = LocalStorage.getItem(LocalStorageKey.lastFetchLoginAwardTime);
				const lastFetchLoginAwardDate = new Date(lastFetchLoginAwardTime);
				const nowDate = new Date();
				// 如果上一次领取奖励的时间就在今天，那么也不弹窗
				if (lastFetchLoginAwardDate.getFullYear() !== nowDate.getFullYear() ||
					lastFetchLoginAwardDate.getMonth() !== nowDate.getMonth() ||
					lastFetchLoginAwardDate.getDate() !== nowDate.getDate()) {
					LoginAwardPanel.instance.show();
				}
			}
		})
	}

	private _onEnterLevelScreen(): void {
		this.dispatchEvent(new StarEvent(StarEvent.ENTER_LEVEL_SCREEN));
	}

	private _onEnterLevel2Screen(): void {
		this.dispatchEvent(new StarEvent(StarEvent.ENTER_LEVEL_2));
	}

	/**
	 * 打开兑换码界面的事件
	 */
	private _onRedeemCode(): void {
		this.dispatchEvent(new StarEvent(StarEvent.SHOW_REDEEM_CODE));
	}

	private _onActivity(): void {
		this.dispatchEvent(new StarEvent(StarEvent.SHOW_ACTIVITY));
	}

	private _onSetting(): void {
		this.dispatchEvent(new StarEvent(StarEvent.SHOW_SETTING));
	}

	private _onShop(): void {
		ShopPanel.instance.show();
	}

	private _onGift(): void {
		FetchGiftPanel.instance.show();
	}

	static get instance(): MainScene {
		if (!MainScene._instance) {
			MainScene._instance = new MainScene();
		}
		return MainScene._instance;
	}
}