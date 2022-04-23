
export interface BonkDisc {
    x : number;//position X
    y : number;//position Y
    xv : number;//velocity X
    yv : number;//velocity Y
    sx : number;//spawn location x
    sy : number;//spawn location y
    sxv : number;//spawn velocity x
    syv : number;//spawn velocity y
    a : number;//angle
    av : number;//angular velocity
    a1a : number;//unknown? cooldown?
    team : number;//Team -- 1: FFA, 2: red, 3: blue, 4: green, 5: yellow
    a1 : boolean;//unknown, action related?
    lhid? : number;//Last hit ID
    lht? : number;//Last hit time
    ds? : number;//unknown
    da? : number;//unknown
    tcd? : number;
    extraVelY? : number;
    extraVelX? : number;
    ni? : boolean,
    a2? : boolean,
    radius? : number,
    swing? : BonkSwingState | false,
    spawnTeamInfo? : any,//TODO: DETERMINE
}

export interface BonkSwingState {
    b: number,//Body?
    l: number,//Length
    p: [number, number]//Point
}

interface BonkDiscTransients {
    pid : number;
    deathReason : number;
    diedThisFrame : boolean;
    radius : number;//It's the radius of the ball, dude
    charge : number;
    drawstrength : number;
    action1 : boolean;
    action2 : boolean;
    swingThisFrame : boolean;
    aimangle : number | undefined;//Chaz performs dynamic mid-cycle updates to angular velocity (joy), this is the only way to do that safely.
    lastHitID? : number;
    lastHitTime? : number;
    newSwing? : BonkSwingState;
}

interface BonkPhysicsImplicitStates {
    heavyUsesCharge : boolean;
    grapple : boolean;
    anyarrows : boolean;
    gameActive : boolean;
    vtol : boolean;
    simple : boolean;
    bonk : boolean;
    arrows : boolean;
    darrows : boolean;
}

export interface BonkMapSpawn {
    b: boolean,//Blue
    gr: boolean,//Green
    r: boolean,//Red
    ye: boolean,//Yellow
    f: boolean,
    priority: number,
    n: string,
    x: number,//Coordinate X
    y: number,//Coordinate Y
    xv: number,//Initial Velocity X
    yv: number,//Initial Velocity Y
}


export interface BonkCaptureZone {
    n?: string;//Name
    i: number;//Fixture index
    ty: number;
    l: number;//Capture Length (seconds in map form, frames in pstate form)
    p: number;//Power / Capture completion
    o: number;//Owner
    ot: number;//Owner Team
    f: number;//Final countdown -- Jumps to 20 upon capture, decreases by one per frame, on zero, win is executed.
}

export type BonkJoint = BonkJointBase & (BonkJointFollowsPath | BonkJointGear | BonkJointRotating | BonkJointSoftRod | BonkJointLegacyFollowsPath | BonkJointLegacySpring);


export interface BonkJointBase {
    type: string;
    bb: number;//Body B
    ba: number;//Body A
    d: {
        bf : number;
        cc : boolean;
        dl: boolean;
    }
}

export interface BonkJointRotating {
    type: "rv"
    aa : number[];//Attach A
    ab? :number[];//Dragonhere, this was not caught by the ISG pass. Do we have a possible desync boundary?
    d: {
        el: boolean;
        em: boolean;
        la: number;
        mmt: number;
        ms: number;
        ua: number;
        cc?:boolean;//Dragonhere, this was not caught by the ISG pass. Do we have a possible desync boundary?
    }
}

export interface BonkJointSoftRod {
    type: "d";
    aa : number[];//Attach A
    ab : number[];//Attach B
    len? : number;//Length of spring !ISG (internal cached value)
    d: {
        dr: number;//Damping Ratio
        fh: number;//Frequency (hz)
        cc: boolean;//Collides connected !ISG
    }
}

export interface BonkJointLegacyFollowsPath {
    type: "lpj";
    pa: number;//path angle
    pax: number;//path attach x
    pay: number;//path attach y
    pf: number;//path force/motor force
    pl: number;
    plen: number;//Path length
    pms: number;//Path Motor Speed
    pu: number;
}

export interface BonkJointLegacySpring {
    type: "lsj";
    sax: number|undefined;
    say: number|undefined;
    slen: number;
    sf: number;
}

export interface BonkJointFollowsPath {
    type: "p";
    aa : number[];//Attach A
    ab : number[];//Attach B
    axa? : number[];//DragonHere NOT IMPLEMENTED BY ISG
    d : {
        ut : number;//Upper translation limit
        lt : number;//Lower translation limit
        mmf : number;//Max motor force
        ms : number;//Motor Speed
        el? : boolean;//Enable limits?//DragonHere NOT IMPLEMENTED BY ISG
        em? : boolean;//Enable motor?//DragonHere NOT IMPLEMENTED BY ISG
        cc? : boolean;//Collides with connected?//DragonHere NOT IMPLEMENTED BY ISG
    }
    cs? : any;//TODO Determine
}

export interface BonkJointGear {
    type: "g";
    ja?: number;
    jb?: number;
    d : {
        r?: number;
        cc?: boolean;
    }
}



export type BonkShape = BonkShapeBase & (BonkShapeBox | BonkShapeCircle | BonkShapeChain | BonkShapePolygon);
export interface BonkShapeBase {
    type : string;
    c : number[];
}

export interface BonkShapeBox {
    type : "bx";
    w : number;//width
    h : number;//height
    a : number;//angle
    sk: boolean;//shrink
}

export interface BonkShapeCircle {
    type : "ci";
    r : number;//radius
    sk: boolean;//shrink
}

export interface BonkShapePolygon {
    type : "po";
    v : (number[])[];//Vertices
    s : number;//scale
    a : number;//angle
}

export interface BonkShapeChain {
    type : "ch";
    v : (number[])[];//Vertices
    s : number;//scale
    a : number;
}

type BonkFixture = BonkFixtureBase;
interface BonkFixtureBase {
    d: boolean;
    de?: number//Density Override
    f: number;//Color????????????
    fr?: number;//Friction override
    n: string;
    np: boolean;//np for No Physics
    fp? : boolean;
    re? : number;//Restitution/bounciness override
    sh: number;
}

export type BonkBody = BonkBodyBase & (BonkBodyDynamic | BonkBodyKinematic | BonkBodyStationary);
export interface BonkBodyBase {
    type : string;//Body type
    p : number[];//Body location
    cf? : { // Constant Forces
        x : number,//Constant Force X
        y : number,//Constant Force Y
        ct : number,//Constant Torque
        w: boolean,//?????
    }
    lv : number[],//Linear Velocity
    av : number,//Angular Velocity
    a : number,
    ad : number,
    bu : boolean,
    de: number,
    f_1: boolean,
    f_2: boolean,
    f_3: boolean,
    f_4: boolean,
    f_c: number,
    f_p: boolean,
    fr: boolean,
    fric: number,
    fricp: boolean,
    fx: number[],
    ld: number,
    n?:string,//name
    re: number,
    bg?: any,
}

//TODO Remove subspecialization
export interface BonkBodyStationary {
    type : "s";
}

export interface BonkBodyKinematic {
    type : "k";
}

export interface BonkBodyDynamic {
    type : "d";
}


export interface MapPhysics {
    ppm : number,
    bodies : (BonkBody | undefined)[];
    fixtures : (BonkFixture | undefined)[];
    shapes : (BonkShape | undefined)[];
    joints: (BonkJoint | undefined)[];
    bro:number[];
};

export interface BonkMap {
    physics : MapPhysics;
    capZones: BonkCaptureZone[];
    spawns: BonkMapSpawn[];
    m:any;
    s:any;
}
export interface SessionPlayerInfo {
    id: number,
    team: number,
}

export class BonkPhysicsSettings {
    public map : BonkMap | null;
    public rc? : any;//TODO determine
    public maps : any;//TODO determine
    public gt : number;//TODO determine
    public wl : number;//TODO determine
    public q : boolean;//Quickplay
    public tl : boolean;//TODO determine
    public tea : boolean;//TODO determine
    public ga : string;//TODO determine
    public mo : string;//TODO determine
    public world : any;//TODO determine
    public bal : any[];//TODO determine
    public sa1s:number;//Grapple energy drain rate
    public sa1t:number;//Grapple loss energy threshold
    public sa1r:number;//Grapple energy recharge rate
    constructor() {
        this.map = null;
        this.gt = 2;
        this.wl = 3;
        this.q = false;
        this.tl = false;
        this.tea = false;
        this.ga = "b";
        this.mo = "b";
        this.world = {
            timeMS: 30
        };
        this.bal = [];
        this.sa1s = 4;
        this.sa1r = 3;
        this.sa1t = 500;
    }
}

export interface BonkPhysicsState {
    discs : (BonkDisc | undefined)[];
    discDeaths : any[];//TODO determine
    physics : MapPhysics,
    capZones : BonkCaptureZone[];
    seed:number;
    fte:number;//Frames to End (initialized to -1, get set to, I think, 90 frames? at the start of the end of the game, counts down accordingly)
    ftu:number;
    players:(SessionPlayerInfo|undefined)[];
    scores:(number|undefined)[];
    lscr: number;
    ms: BonkMapSettings;
    mm: any;//TODO determine
    rl: number;
    projectiles: (BonkProjectile|undefined)[];
    sts?: [number, number, number][]|null;
    shk?: {x:number, y:number};
    rc?: any;//TODO determine
    dontInterpolate?:boolean;
}

export interface BonkDeathAnimation {
    i : number,
    x : number,
    y : number,
    xv: number,
    yv: number,
    m: number,
    f: number
}

export interface BonkProjectile {
    a: number,//angle
    av: number,//angular velocity
    did: number,//Disc ID
    fte: number,
    team: number,
    type?: string,
    x: number,
    xv: number,
    y: number,
    yv: number,
}

export interface BonkMapSettings {
    re : boolean;//Respawn
    nc : boolean;//NoCollide
    pq : number;//No fucking clue
}

export interface BonkPlayerInputFrame {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    action: boolean;
    action2: boolean;
}

export interface BonkAdminEvent {
    playersJoined:number[],
    playersLeft:number[],
    pc:number,
}

export interface BonkCapOccupancy {
    count : number,
    players : number[],
}

interface BonkSwingInitiation {
    id: number,
    local_attach: b2Vec2,
    distance: number,
}
