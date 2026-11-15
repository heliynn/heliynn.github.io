/* =============================================================
/*                       servyy's offsets                         
/*                  https://servfur.github.io                    
/* -------------------------------------------------------------
/*  Dumped by       : servyy <3                                 
/*  Site            : https://servfur.github.io                  
/*  Roblox Version  : version-4ea8e85481e34f46
/*  Dumper Version  : 2.2.6
/*  Dumped At       : 23:01 13/11/2026 (GMT)
/*  Total Offsets   : 645
/* -------------------------------------------------------------
/*  by servyy <3                                                
/*  https://servfur.github.io                                    
/* =============================================================
*/

namespace Offsets {
    public static class Info {
        public static string ClientVersion = "version-4ea8e85481e34f46";
    }

    public static class AirProperties {
         public const long AirDensity = 0x18;
         public const long GlobalWind = 0x3c;
    }

    public static class AnimationTrack {
         public const long Animation = 0xa0;
         public const long Animator = 0xf8;
         public const long IsPlaying = 0xa10;
         public const long Looped = 0xcc;
         public const long Speed = 0xbc;
         public const long TimePosition = 0xc0;
    }

    public static class Animator {
         public const long ActiveAnimations = 0x920;
    }

    public static class Atmosphere {
         public const long Color = 0xa0;
         public const long Decay = 0xac;
         public const long Density = 0xb8;
         public const long Glare = 0xbc;
         public const long Haze = 0xc0;
         public const long Offset = 0xc4;
    }

    public static class Attachment {
         public const long Position = 0xac;
    }

    public static class BasePart {
         public const long CastShadow = 0x120;
         public const long ClusterNode = 0x180;
         public const long Color3 = 0x11c;
         public const long Locked = 0x121;
         public const long Massless = 0x122;
         public const long Primitive = 0x178;
         public const long Reflectance = 0xf4;
         public const long Shape = 0x1a0;
         public const long Transparency = 0x118;
    }

    public static class Beam {
         public const long Attachment0 = 0x148;
         public const long Attachment1 = 0x158;
         public const long Brightness = 0x168;
         public const long CurveSize0 = 0x16c;
         public const long CurveSize1 = 0x170;
         public const long LightEmission = 0x174;
         public const long LightInfluence = 0x178;
         public const long Texture = 0x128;
         public const long TextureLength = 0x184;
         public const long TextureSpeed = 0x18c;
         public const long Width0 = 0x190;
         public const long Width1 = 0x194;
         public const long ZOffset = 0x198;
    }

    public static class BloomEffect {
         public const long Enabled = 0x98;
         public const long Intensity = 0xa0;
         public const long Size = 0xa4;
         public const long Threshold = 0xa8;
    }

    public static class BlurEffect {
         public const long Enabled = 0x98;
         public const long Size = 0xa0;
    }

    public static class BoundFuncDescriptor {
         public const long Function = 0xb0;
         public const long Name = 0x8;
    }

    public static class ByteCode {
         public const long Pointer = 0x18;
         public const long Size = 0x30;
    }

    public static class CachedItem {
         public const long FileMeshData = 0x40;
    }

    public static class Camera {
         public const long CFrame = 0xc0;
         public const long CameraSubject = 0xb0;
         public const long CameraType = 0x120;
         public const long FieldOfView = 0x128;
         public const long ImagePlaneDepth = 0x2d4;
         public const long Position = 0xe4;
         public const long Rotation = 0xc0;
         public const long Viewport = 0x284;
         public const long ViewportSize = 0x2c4;
    }

    public static class CharacterMesh {
         public const long BaseTextureId = 0xb0;
         public const long BodyPart = 0x130;
         public const long MeshId = 0xe0;
         public const long OverlayTextureId = 0x110;
    }

    public static class ChunkEntry {
         public const long Shape = 0x10;
         public const long State = 0xc;
         public const long X = 0x0;
         public const long Y = 0x4;
         public const long Z = 0x8;
    }

    public static class ChunkMeshShape {
         public const long Indices = 0x38;
         public const long TriangleCount = 0x40;
         public const long VertexCount = 0x30;
         public const long Vertices = 0x20;
    }

    public static class ClassDescriptor {
         public const long FunctionDescriptors = 0xd0;
         public const long Name = 0x8;
    }

    public static class ClickDetector {
         public const long MaxActivationDistance = 0xd0;
         public const long MouseIcon = 0xb0;
    }

    public static class Closure {
         public const long isC = 0x6;
    }

    public static class Clothing {
         public const long Color3 = 0x108;
         public const long Template = 0xe8;
    }

    public static class ColorCorrectionEffect {
         public const long Brightness = 0xac;
         public const long Contrast = 0xb0;
         public const long Enabled = 0x98;
         public const long TintColor = 0xa0;
    }

    public static class ColorGradingEffect {
         public const long Enabled = 0x98;
         public const long TonemapperPreset = 0xa0;
    }

    public static class Coroutine {
         public const long Create = 0x5addf70;
         public const long Finally = 0x5ae10b0;
         public const long IsYieldable = 0x5ade8a0;
         public const long Running = 0x5ade830;
         public const long Status = 0x5adbaa0;
         public const long Wrap = 0x5ade510;
         public const long Yield = 0x5ade7d0;
    }

    public static class DataModel {
         public const long CreatorId = 0x190;
         public const long GameId = 0x198;
         public const long GameLoaded = 0x5b8;
         public const long JobId = 0x108;
         public const long PlaceId = 0x1a0;
         public const long PlaceVersion = 0x1bc;
         public const long PrimitiveCount = 0x430;
         public const long ScriptContext = 0x440;
         public const long ServerIP = 0x5a0;
         public const long ToRenderView1 = 0x1d8;
         public const long ToRenderView2 = 0x8;
         public const long ToRenderView3 = 0x28;
         public const long Workspace = 0x168;
    }

    public static class DepthOfFieldEffect {
         public const long Enabled = 0x98;
         public const long FarIntensity = 0xa0;
         public const long FocusDistance = 0xa4;
         public const long InFocusRadius = 0xa8;
         public const long NearIntensity = 0xac;
    }

    public static class DeviceD3D11 {
         public const long Context = 0x190;
         public const long ContextObj = 0x1c0;
         public const long ContextPtr = 0x190;
         public const long DevicePtr = 0x188;
         public const long SwapChainPtr = 0x90;
         public const long VTableRva = 0x719fad8;
    }

    public static class DragDetector {
         public const long ActivatedCursorIcon = 0x188;
         public const long CursorIcon = 0xb0;
         public const long MaxActivationDistance = 0xd0;
         public const long MaxDragAngle = 0x270;
         public const long MaxDragTranslation = 0x234;
         public const long MaxForce = 0x274;
         public const long MaxTorque = 0x278;
         public const long MinDragAngle = 0x27c;
         public const long MinDragTranslation = 0x240;
         public const long ReferenceInstance = 0x1b8;
         public const long Responsiveness = 0x288;
    }

    public static class FFlagList {
         public const long Head = 0x8;
         public const long NodeName = 0x10;
         public const long NodeNext = 0x0;
         public const long NodeValue = 0x30;
         public const long Pointer = 0x865e868;
         public const long ValueOffset = 0x20;
    }

    public static class FakeDataModel {
         public const long Pointer = 0x8f8e968;
         public const long RealDataModel = 0x1f8;
    }

    public static class FastCluster {
         public const long BindingSubobject = 0x90;
         public const long EntityBegin = 0x48;
         public const long EntityEnd = 0x50;
         public const long VTableRva = 0x7204690;
         public const long VTableRvaSub = 0x7204558;
    }

    public static class FastClusterBinding {
         public const long Owner = 0x60;
    }

    public static class FastClusterEntity {
         public const long AlphaByte = 0x14;
         public const long BBoxMaxX = 0xa4;
         public const long BBoxMaxY = 0xa8;
         public const long BBoxMaxZ = 0xac;
         public const long BBoxMinX = 0x98;
         public const long BBoxMinY = 0x9c;
         public const long BBoxMinZ = 0xa0;
         public const long ContextPtr = 0x8;
         public const long DecalMaterialPtr = 0x48;
         public const long MaterialControlBlock = 0x28;
         public const long MaterialPtr = 0x20;
         public const long MeshVTableRva = 0x7205838;
         public const long PrimitiveIndexArrayPtr = 0x80;
         public const long PrimitivePtr = 0x8;
         public const long RenderQueueId = 0x10;
         public const long TechniqueArrayPtr = 0x70;
         public const long VTableRva = 0x72057f0;
         public const long VertexBuffer = 0x50;
    }

    public static class FastClusterMeshGenerator {
         public const long VTableRva = 0x7205838;
    }

    public static class FileMeshData {
         public const long AABBMax = 0x18c;
         public const long AABBMin = 0x180;
         public const long Faces = 0x30;
         public const long FacesEnd = 0x38;
         public const long Vertices = 0x0;
         public const long VerticesEnd = 0x8;
    }

    public static class FunctionDescriptor {
         public const long Function = 0xb0;
    }

    public static class Functions {
         public const long GlobalCollectGarbage = 0x437f380;
         public const long GlobalDelay = 0x437fc10;
         public const long GlobalElapsedTime = 0x4380390;
         public const long GlobalGetFenv = 0x4383990;
         public const long GlobalLoadstring = 0x4380410;
         public const long GlobalPluginManager = 0x4380ad0;
         public const long GlobalPrint = 0x4380fb0;
         public const long GlobalPrintIdentity = 0x4380fd0;
         public const long GlobalRequire = 0x43810d0;
         public const long GlobalSetFenv = 0x4383ad0;
         public const long GlobalSettings = 0x43816a0;
         public const long GlobalSpawn = 0x4381b40;
         public const long GlobalStats = 0x43822c0;
         public const long GlobalTick = 0x43827f0;
         public const long GlobalTime = 0x4382870;
         public const long GlobalUserSettings = 0x4382a80;
         public const long GlobalVersion = 0x4382ea0;
         public const long GlobalWait = 0x4382f90;
         public const long GlobalWarn = 0x4383190;
    }

    public static class GeometryD3D11 {
         public const long VTableRva = 0x71a0008;
    }

    public static class GuiBase2D {
         public const long AbsolutePosition = 0xf4;
         public const long AbsoluteRotation = 0xd0;
         public const long AbsoluteSize = 0xfc;
    }

    public static class GuiObject {
         public const long BackgroundColor3 = 0x2d8;
         public const long BackgroundTransparency = 0x2fc;
         public const long BorderColor3 = 0x2e4;
         public const long BorderSizePixel = 0x304;
         public const long Image = 0x670;
         public const long ImageRectOffset = 0x7c4;
         public const long LayoutOrder = 0x314;
         public const long Position = 0x2a8;
         public const long RichText = 0x7c8;
         public const long Rotation = 0xd0;
         public const long SelectionOrder = 0x330;
         public const long Size = 0x2c8;
         public const long Text = 0xa30;
         public const long TextColor3 = 0xae0;
         public const long Visible = 0x720;
         public const long ZIndex = 0x33c;
    }

    public static class HandleAdornment {
         public const long CFrame = 0x100;
    }

    public static class Highlight {
         public const long Adornee = 0xa0;
         public const long FillColor = 0xb0;
    }

    public static class Humanoid {
         public const long AutoJumpEnabled = 0x1cc;
         public const long AutoRotate = 0x1cd;
         public const long AutomaticScalingEnabled = 0x1ce;
         public const long BreakJointsOnDeath = 0x1d0;
         public const long CameraOffset = 0x110;
         public const long DisplayDistanceType = 0x174;
         public const long DisplayName = 0xa0;
         public const long EvaluateStateMachine = 0x1d1;
         public const long Health = 0x184;
         public const long HealthDisplayDistance = 0x17c;
         public const long HealthDisplayType = 0x180;
         public const long HipHeight = 0x188;
         public const long HumanoidRootPart = 0x468;
         public const long HumanoidState = 0x8b0;
         public const long HumanoidStateID = 0x20;
         public const long IsWalking = 0xa46;
         public const long Jump = 0x1d4;
         public const long JumpHeight = 0x198;
         public const long JumpPower = 0x19c;
         public const long MaxHealth = 0x1a0;
         public const long MaxSlopeAngle = 0x1a4;
         public const long MoveDirection = 0x134;
         public const long MoveToPart = 0x100;
         public const long MoveToPoint = 0x158;
         public const long NameDisplayDistance = 0x1a8;
         public const long NameOcclusion = 0x1ac;
         public const long PlatformStand = 0x1d6;
         public const long PlatformStatePointer = 0x8b0;
         public const long RequiresNeck = 0x1d7;
         public const long RigType = 0x1b8;
         public const long SeatPart = 0xf0;
         public const long Sit = 0x1d8;
         public const long TargetPoint = 0x140;
         public const long UseJumpPower = 0x1da;
         public const long WalkTimer = 0x3f0;
         public const long WalkToPoint = 0x158;
         public const long Walkspeed = 0x1c8;
         public const long WalkspeedCheck = 0x3a4;
    }

    public static class Instance {
         public const long ChildrenEnd = 0x8;
         public const long ChildrenStart = 0x70;
         public const long ClassBase = 0x1b0;
         public const long ClassDescriptor = 0x18;
         public const long ClassName = 0x8;
         public const long Name = 0x0;
         public const long NameContainer = 0x68;
         public const long Parent = 0x60;
         public const long SetParent = 0x1d27e60;
         public const long This = 0x8;
    }

    public static class JointInstance {
         public const long Part0 = 0x100;
         public const long Part1 = 0x110;
    }

    public static class LRUHolder {
         public const long MemEnforcedLRUCache = 0x20;
    }

    public static class LRUNode {
         public const long AssetID = 0x10;
         public const long CachedItem = 0x40;
         public const long Next = 0x0;
    }

    public static class Lighting {
         public const long Ambient = 0xb8;
         public const long Brightness = 0x100;
         public const long ClockTime = 0xb0;
         public const long ColorShift_Bottom = 0xc4;
         public const long ColorShift_Top = 0xd0;
         public const long EnvironmentDiffuseScale = 0x104;
         public const long EnvironmentSpecularScale = 0x108;
         public const long ExposureCompensation = 0x10c;
         public const long FogColor = 0xdc;
         public const long FogEnd = 0x114;
         public const long FogStart = 0x118;
         public const long GeographicLatitude = 0x11c;
         public const long GlobalShadows = 0x12c;
         public const long GradientBottom = 0x178;
         public const long GradientTop = 0x138;
         public const long LightColor = 0x144;
         public const long LightDirection = 0x150;
         public const long MoonPosition = 0x16c;
         public const long OutdoorAmbient = 0xe8;
         public const long Sky = 0x1b0;
         public const long Source = 0x15c;
         public const long SunPosition = 0x160;
    }

    public static class LocalScript {
         public const long ByteCode = 0x178;
         public const long GUID = 0xb8;
         public const long Hash = 0x188;
    }

    public static class LuaB {
         public const long LuaBAssert = 0x5aae900;
         public const long LuaBError = 0x5aa9350;
         public const long LuaBGcinfo = 0x5aac780;
         public const long LuaBGetFenv = 0x5aaae00;
         public const long LuaBGetMetatable = 0x5aaa290;
         public const long LuaBNewProxy = 0x5aaf4f0;
         public const long LuaBNext = 0x5aade60;
         public const long LuaBPrint = 0x5aa8f00;
         public const long LuaBRawEqual = 0x5aab0f0;
         public const long LuaBRawGet = 0x5aab200;
         public const long LuaBRawLen = 0x5aac6e0;
         public const long LuaBRawSet = 0x5aabb70;
         public const long LuaBSelect = 0x5aae9b0;
         public const long LuaBSetFenv = 0x5aaaec0;
         public const long LuaBSetMetatable = 0x5aaa420;
         public const long LuaBTonumber = 0x5aa8fc0;
         public const long LuaBTostring = 0x5aaf490;
         public const long LuaBType = 0x5aac7a0;
         public const long LuaBTypeof = 0x5aad300;
    }

    public static class LuaCoroutine {
         public const long Create = 0x5addf70;
         public const long Finally = 0x5ae10b0;
         public const long IsYieldable = 0x5ade8a0;
         public const long Running = 0x5ade830;
         public const long Status = 0x5adbaa0;
         public const long Wrap = 0x5ade510;
         public const long Yield = 0x5ade7d0;
    }

    public static class LuaState {
         public const long Base = 0x68;
         public const long Ci = 0x78;
         public const long Global = 0x60;
         public const long Stack = 0x58;
         public const long StackLast = 0x48;
         public const long Top = 0x70;
         public const long Tt = 0x0;
    }

    public static class Luau {
         public const long ClosureIsC = 0x6;
         public const long StateBase = 0x68;
         public const long StateCI = 0x78;
         public const long StateGlobal = 0x60;
         public const long StateTop = 0x70;
         public const long TString_Data = 0x18;
         public const long TString_Hash = 0x10;
         public const long TString_Length = 0x14;
         public const long TString_Tag = 0x0;
         public const long TValueSize = 0x10;
         public const long TValue_Size = 0x10;
         public const long TValue_Tag = 0xc;
         public const long TValue_TagNumber = 0x3;
         public const long TValue_TagString = 0x5;
         public const long TValue_TagTable = 0x6;
         public const long TValue_Value = 0x0;
         public const long Table_Array = 0x20;
         public const long Table_NodeArray = 0x28;
         public const long Table_SizeArray = 0x8;
         public const long Table_Tag = 0x0;
         public const long Table_lsizenode = 0xc;
         public const long luaB_assert = 0x5aae900;
         public const long luaB_error = 0x5aa9350;
         public const long luaB_gcinfo = 0x5aac780;
         public const long luaB_getfenv = 0x5aaae00;
         public const long luaB_getmetatable = 0x5aaa290;
         public const long luaB_newproxy = 0x5aaf4f0;
         public const long luaB_next = 0x5aade60;
         public const long luaB_print = 0x5aa8f00;
         public const long luaB_rawequal = 0x5aab0f0;
         public const long luaB_rawget = 0x5aab200;
         public const long luaB_rawlen = 0x5aac6e0;
         public const long luaB_rawset = 0x5aabb70;
         public const long luaB_select = 0x5aae9b0;
         public const long luaB_setfenv = 0x5aaaec0;
         public const long luaB_setmetatable = 0x5aaa420;
         public const long luaB_tonumber = 0x5aa8fc0;
         public const long luaB_tostring = 0x5aaf490;
         public const long luaB_type = 0x5aac7a0;
         public const long luaB_typeof = 0x5aad300;
    }

    public static class MaterialColors {
         public const long Asphalt = 0x30;
         public const long Basalt = 0x27;
         public const long Brick = 0xf;
         public const long Cobblestone = 0x33;
         public const long Concrete = 0xc;
         public const long CrackedLava = 0x2d;
         public const long Glacier = 0x1b;
         public const long Grass = 0x6;
         public const long Ground = 0x2a;
         public const long Ice = 0x36;
         public const long LeafyGrass = 0x39;
         public const long Limestone = 0x3f;
         public const long Mud = 0x24;
         public const long Pavement = 0x42;
         public const long Rock = 0x18;
         public const long Salt = 0x3c;
         public const long Sand = 0x12;
         public const long Sandstone = 0x21;
         public const long Slate = 0x9;
         public const long Snow = 0x1e;
         public const long WoodPlanks = 0x15;
    }

    public static class MaterialLayer {
         public const long ColorData = 0x24;
         public const long FillModeByte = 0x11;
         public const long Flags2 = 0x20;
         public const long MatFlags = 0x18;
         public const long Param = 0x1c;
         public const long Stride = 0x88;
         public const long Stride = 0x88;
    }

    public static class MemEnforcedLRUCache {
         public const long Head = 0x8;
    }

    public static class MeshContentProvider {
         public const long AssetID = 0x10;
         public const long Cache = 0xc0;
         public const long LRUCache = 0x20;
         public const long LRUHolder = 0xc0;
         public const long MeshData = 0x40;
         public const long ToMeshData = 0x40;
    }

    public static class MeshData {
         public const long FaceEnd = 0x38;
         public const long FaceStart = 0x30;
         public const long VertexEnd = 0x8;
         public const long VertexStart = 0x0;
    }

    public static class MeshPart {
         public const long MeshId = 0x2f8;
         public const long MeshSize = 0x210;
         public const long Texture = 0x328;
    }

    public static class Misc {
         public const long Adornee = 0xd8;
         public const long AnimationId = 0xa8;
         public const long StringLength = 0x10;
         public const long Value = 0xa0;
    }

    public static class Model {
         public const long PrimaryPart = 0x240;
         public const long Scale = 0x12c;
    }

    public static class ModuleScript {
         public const long ByteCode = 0x120;
         public const long GUID = 0xb8;
         public const long Hash = 0x348;
         public const long IsCoreScript = 0x93;
    }

    public static class MouseService {
         public const long InputObject = 0xe8;
         public const long InputObject2 = 0xf8;
         public const long MousePosition = 0xbc;
    }

    public static class ParticleEmitter {
         public const long Acceleration = 0x1c8;
         public const long Brightness = 0x204;
         public const long Drag = 0x208;
         public const long Lifetime = 0x1dc;
         public const long LightEmission = 0x220;
         public const long LightInfluence = 0x224;
         public const long Rate = 0x230;
         public const long RotSpeed = 0x1e4;
         public const long Rotation = 0x1ec;
         public const long Speed = 0x1f4;
         public const long SpreadAngle = 0x1fc;
         public const long Texture = 0x1a8;
         public const long TimeScale = 0x244;
         public const long VelocityInheritance = 0x248;
         public const long ZOffset = 0x24c;
    }

    public static class Player {
         public const long AccountAge = 0x364;
         public const long CameraMode = 0x378;
         public const long DisplayName = 0x120;
         public const long HealthDisplayDistance = 0x3a0;
         public const long LocalPlayer = 0x118;
         public const long LocaleId = 0x740;
         public const long MaxZoomDistance = 0x370;
         public const long MinZoomDistance = 0x374;
         public const long ModelInstance = 0x2a0;
         public const long Mouse = 0x11f0;
         public const long NameDisplayDistance = 0x3b0;
         public const long Team = 0x2e0;
         public const long TeamColor = 0x3b8;
         public const long UserId = 0xb8;
    }

    public static class PlayerMouse {
         public const long Icon = 0xb0;
         public const long Workspace = 0x138;
    }

    public static class Primitive {
         public const long AssemblyAngularVelocity = 0xec;
         public const long AssemblyLinearVelocity = 0xe0;
         public const long Flags = 0x1be;
         public const long Geometry = 0x210;
         public const long Material = 0x24e;
         public const long MaterialType = 0x24e;
         public const long Owner = 0x218;
         public const long Position = 0xd4;
         public const long Rotation = 0xb0;
         public const long Size = 0x1c4;
         public const long Validate = 0x6;
    }

    public static class PrimitiveFlags {
         public const long Anchored = 0x2;
         public const long CanCollide = 0x8;
         public const long CanQuery = 0x20;
         public const long CanTouch = 0x10;
    }

    public static class ProximityPrompt {
         public const long ActionText = 0x98;
         public const long Enabled = 0x11e;
         public const long GamepadKeyCode = 0x104;
         public const long HoldDuration = 0x108;
         public const long KeyCode = 0x10c;
         public const long MaxActivationDistance = 0x110;
         public const long ObjectText = 0xb8;
         public const long RequiresLineOfSight = 0x11f;
    }

    public static class RakNet {
         public const long Connect = 0x288c2b0;
         public const long DeallocatePacket = 0x288e9f0;
         public const long Receive = 0x288e2f0;
         public const long Send = 0x288dc00;
         public const long Shutdown = 0x288ca80;
         public const long Startup = 0x2889ea0;
         public const long VTableRva = 0x71a0638;
    }

    public static class Raycast {
         public const long RaycastBoundDesc = 0x870b040;
         public const long RaycastBoundFn = 0xb0;
         public const long RaycastBoundFnRva = 0xd34420;
         public const long RaycastDescriptorRva = 0x870b040;
    }

    public static class RegionNode {
         public const long Key = 0x10;
         public const long SlotStride = 0x10;
         public const long Slots = 0x68;
    }

    public static class RegionSlot {
         public const long Entry = 0x8;
    }

    public static class RemoteEvent {
         public const long FireServer = 0x34e0080;
         public const long InstanceArgumentMeta0 = 0x8f02d40;
         public const long InstanceArgumentMeta1 = 0x8e37f40;
         public const long OnClientEvent = 0x34df170;
         public const long OnServerEvent = 0x34df120;
    }

    public static class RemoteFunction {
         public const long InvokeServer = 0x35b9980;
         public const long OnClientInvoke = 0x35ba0d0;
    }

    public static class RemoteSpy {
         public const long RemoteEventVTableRva = 0x71fc8f0;
    }

    public static class RenderJob {
         public const long FakeDataModel = 0x38;
         public const long RealDataModel = 0x1f0;
         public const long RenderView = 0x1e0;
    }

    public static class RenderView {
         public const long DeviceD3D11 = 0x10;
         public const long VisualEngine = 0x20;
    }

    public static class RunService {
         public const long HeartbeatFPS = 0xc8;
         public const long HeartbeatTask = 0xd8;
    }

    public static class Script {
         public const long ByteCode = 0x178;
         public const long GUID = 0xb8;
         public const long Hash = 0x188;
    }

    public static class ScriptContext {
         public const long VTable = 0x7269f98;
    }

    public static class Seat {
         public const long Occupant = 0x200;
    }

    public static class Signals {
         public const long IsLegalSendEvent = 0x3cca190;
    }

    public static class Sky {
         public const long DrawAdv = 0x392c7c4;
         public const long DrawCubeCallB = 0x37f6ebf;
         public const long MoonAngularSize = 0x22c;
         public const long MoonTextureId = 0xb0;
         public const long SkyboxBk = 0xe0;
         public const long SkyboxDn = 0x110;
         public const long SkyboxFt = 0x140;
         public const long SkyboxLf = 0x170;
         public const long SkyboxOrientation = 0x220;
         public const long SkyboxRt = 0x1a0;
         public const long SkyboxUp = 0x1d0;
         public const long StarCount = 0x230;
         public const long SunAngularSize = 0x234;
         public const long SunTextureId = 0x200;
    }

    public static class SmoothClusterGeometry {
         public const long GridOld = 0x48;
         public const long RegionCount = 0xb0;
         public const long Regions = 0xa8;
    }

    public static class Sound {
         public const long IsPlaying = 0x130;
         public const long Looped = 0x12d;
         public const long PlaybackSpeed = 0x10c;
         public const long RollOffMaxDistance = 0x110;
         public const long RollOffMinDistance = 0x114;
         public const long SoundGroup = 0xd0;
         public const long SoundId = 0xb0;
         public const long Volume = 0x120;
    }

    public static class SpawnLocation {
         public const long AllowTeamChangeOnTouch = 0x1d8;
         public const long Enabled = 0x1d9;
         public const long ForcefieldDuration = 0x1d0;
         public const long Neutral = 0x1da;
         public const long TeamColor = 0x1d4;
    }

    public static class SpecialMesh {
         public const long MeshId = 0xe0;
         public const long Offset = 0xa0;
         public const long Scale = 0xac;
    }

    public static class SunRaysEffect {
         public const long Enabled = 0x98;
         public const long Intensity = 0xa0;
         public const long Spread = 0xa4;
    }

    public static class SurfaceAppearance {
         public const long AlphaMode = 0x1d8;
         public const long Color = 0x1c0;
         public const long ColorMap = 0xb0;
         public const long EmissiveMaskContent = 0xe0;
         public const long EmissiveStrength = 0x1dc;
         public const long EmissiveTint = 0x1cc;
         public const long MetalnessMap = 0x110;
         public const long NormalMap = 0x140;
         public const long RoughnessMap = 0x170;
    }

    public static class TaskScheduler {
         public const long JobEnd = 0xd0;
         public const long JobName = 0x18;
         public const long JobStart = 0xc8;
         public const long MaxFPS = 0xb0;
         public const long Pointer = 0x8f1e408;
    }

    public static class Team {
         public const long BrickColor = 0xa0;
    }

    public static class TechniqueArray {
         public const long BeginOffset = 0x0;
         public const long EndOffset = 0x8;
         public const long EntryStride = 0x88;
    }

    public static class Terrain {
         public const long GrassLength = 0x1d8;
         public const long MaterialColors = 0x4a0;
         public const long WaterColor = 0x1c8;
         public const long WaterReflectance = 0x1e0;
         public const long WaterTransparency = 0x1e4;
         public const long WaterWaveSize = 0x1e8;
         public const long WaterWaveSpeed = 0x1ec;
    }

    public static class TerrainGrid {
         public const long Grid = 0x238;
         public const long MapHead = 0x30;
         public const long MapSize = 0x38;
         public const long NodeKey = 0x10;
         public const long NodeNext = 0x0;
         public const long NodeOctMask = 0x8c;
         public const long NodeRowIndices = 0x20;
         public const long NodeRows = 0x28;
         public const long NodeStride = 0x30;
         public const long SharedRowsRva = 0x8ae3f70;
    }

    public static class TextButton {
         public const long Selected = 0x6ae;
         public const long TextColor3 = 0xd60;
         public const long TextStrokeColor3 = 0xd6c;
         public const long TextStrokeTransparency = 0xd88;
         public const long TextTransparency = 0xd8c;
    }

    public static class TextLabel {
         public const long TextColor3 = 0xae0;
         public const long TextStrokeColor3 = 0xaec;
         public const long TextStrokeTransparency = 0xb08;
         public const long TextTransparency = 0xb0c;
         public const long TextTruncate = 0xb10;
         public const long TextXAlignment = 0xb14;
    }

    public static class Textures {
         public const long Decal_Texture = 0x1c8;
         public const long Texture_Texture = 0x1c8;
    }

    public static class Tool {
         public const long Activate = 0x30b2850;
         public const long CanBeDropped = 0x4a0;
         public const long Deactivate = 0x30b2900;
         public const long Enabled = 0x4a1;
         public const long Grip = 0x494;
         public const long ManualActivationOnly = 0x4a2;
         public const long RequiresHandle = 0x4a3;
         public const long TextureId = 0x348;
         public const long Tooltip = 0x450;
    }

    public static class TriangleMesh {
         public const long Data = 0x20;
    }

    public static class TriangleMeshData {
         public const long CompoundShape = 0x0;
    }

    public static class UnionOperation {
         public const long AssetId = 0x2f8;
    }

    public static class UserInputService {
         public const long WindowInputState = 0x288;
    }

    public static class VehicleSeat {
         public const long MaxSpeed = 0x210;
         public const long SteerFloat = 0x214;
         public const long ThrottleFloat = 0x218;
         public const long Torque = 0x21c;
         public const long TurnSpeed = 0x220;
    }

    public static class VisualEngine {
         public const long Dimensions = 0xb10;
         public const long EntityManager = 0x7c0;
         public const long FakeDataModel = 0xaf0;
         public const long Pointer = 0x8a11808;
         public const long RenderView = 0xc50;
         public const long SceneUpdater = 0xb40;
         public const long ShaderList = 0x80;
         public const long ShaderManager = 0xbb8;
         public const long ShaderProgram = 0x28;
         public const long TechniqueVec = 0x0;
         public const long ViewMatrix = 0x1b0;
    }

    public static class Weld {
         public const long Part0 = 0x100;
         public const long Part1 = 0x110;
    }

    public static class WeldConstraint {
         public const long Part0 = 0xa0;
         public const long Part1 = 0xb0;
    }

    public static class WindowInputState {
         public const long CapsLock = 0x40;
         public const long CurrentTextBox = 0x48;
    }

    public static class Workspace {
         public const long CurrentCamera = 0x4a0;
         public const long DistributedGameTime = 0x4c0;
         public const long ReadOnlyGravity = 0x9c8;
         public const long World = 0x3f8;
    }

    public static class World {
         public const long AirProperties = 0x230;
         public const long FallenPartsDestroyHeight = 0x20c;
         public const long Gravity = 0x218;
         public const long Primitives = 0x2a0;
         public const long worldStepsPerSec = 0x868;
    }

    public static class btConvexHullShape {
         public const long PointCount = 0x20;
         public const long Points = 0x28;
    }

    public static class btGImpactCompoundShape {
         public const long HullStride = 0x80;
         public const long HullsBegin = 0x30;
         public const long HullsEnd = 0x38;
    }

    public static class lua_State {
         public const long Base = 0x68;
         public const long Ci = 0x78;
         public const long Global = 0x60;
         public const long Stack = 0x58;
         public const long StackLast = 0x48;
         public const long Top = 0x70;
         public const long Tt = 0x0;
    }

}
