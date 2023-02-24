export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	dead: number;
	heal: number;
	highRiskAreaNum: number;
	confirm: number;
	showRate: boolean;
	showHeal: boolean;
	mediumRiskAreaNum: number;
	adcode: string;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	nowConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
}

export interface Total {
	nowConfirm: number;
	dead: number;
	heal: number;
	continueDayZeroConfirmAdd: number;
	wzz: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroConfirm: number;
	mtime: string;
	showRate: boolean;
	showHeal: boolean;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	adcode: string;
}



export interface Total {
	nowConfirm: number;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	adcode: string;
	confirm: number;
	showRate: boolean;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	dead: number;
	heal: number;
	showHeal: boolean;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
}

export interface Children {
	date: string;
	today: Today;
	total: Total;
	name: string;
	adcode: string;
}

export interface Children {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	nowLocalWzz: number;
	deadAdd: number;
	localConfirm: number;
	suspect: number;
	localConfirmH5: number;
	local_acc_confirm: number;
	confirm: number;
	localWzzAdd: number;
	localConfirmAdd: number;
	noInfectH5: number;
	confirmAdd: number;
	nowConfirm: number;
	mRiskTime: string;
	importedCase: number;
	noInfect: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	mtime: string;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	heal: number;
	dead: number;
	nowSevere: number;
}

export interface ChinaAdd {
	noInfect: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	suspect: number;
	importedCase: number;
	confirm: number;
	nowSevere: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	suspect: boolean;
	importedCase: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	all: boolean;
	confirm: boolean;
	dead: boolean;
	heal: boolean;
	nowConfirm: boolean;
	localinfeciton: boolean;
}

export interface Diseaseh5Shelf {
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
}

export interface LocalCityNCOVDataList {
	province: string;
	adcode: string;
	date: string;
	isUpdated: boolean;
	mtime: string;
	local_confirm_add: number;
	mediumRiskAreaNum: number;
	city: string;
	local_wzz_add: string;
	highRiskAreaNum: number;
	isSpecialCity: boolean;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}