#pragma once
/* -------------------------------------------------------------
/*                      servyy's offsets                       
/*                        by servyy <3                         
/* -------------------------------------------------------------
#include <cstdint>
#include <string>
namespace Offsets {
    inline std::string ClientVersion = "version-4ea8e85481e34f46";

    namespace AirProperties {
         inline constexpr uintptr_t AirDensity = 0x18;
         inline constexpr uintptr_t GlobalWind = 0x3c;
    }

    namespace AnimationTrack {
         inline constexpr uintptr_t Animation = 0xa0;
         inline constexpr uintptr_t Animator = 0xf8;
         inline constexpr uintptr_t IsPlaying = 0xa10;
         inline constexpr uintptr_t Looped = 0xcc;
         inline constexpr uintptr_t Speed = 0xbc;
         inline constexpr uintptr_t TimePosition = 0xc0;
    }

    namespace Animator {
         inline constexpr uintptr_t ActiveAnimations = 0x920;
    }

    namespace Atmosphere {
         inline constexpr uintptr_t Color = 0xa0;
         inline constexpr uintptr_t Decay = 0xac;
         inline constexpr uintptr_t Density = 0xb8;
         inline constexpr uintptr_t Glare = 0xbc;
         inline constexpr uintptr_t Haze = 0xc0;
         inline constexpr uintptr_t Offset = 0xc4;
    }

    namespace Attachment {
         inline constexpr uintptr_t Position = 0xac;
    }

    namespace BasePart {
         inline constexpr uintptr_t CastShadow = 0x120;
         inline constexpr uintptr_t ClusterNode = 0x180;
         inline constexpr uintptr_t Color3 = 0x11c;
         inline constexpr uintptr_t Locked = 0x121;
         inline constexpr uintptr_t Massless = 0x122;
         inline constexpr uintptr_t Primitive = 0x178;
         inline constexpr uintptr_t Reflectance = 0xf4;
         inline constexpr uintptr_t Shape = 0x1a0;
         inline constexpr uintptr_t Transparency = 0x118;
    }

    namespace Beam {
         inline constexpr uintptr_t Attachment0 = 0x148;
         inline constexpr uintptr_t Attachment1 = 0x158;
         inline constexpr uintptr_t Brightness = 0x168;
         inline constexpr uintptr_t CurveSize0 = 0x16c;
         inline constexpr uintptr_t CurveSize1 = 0x170;
         inline constexpr uintptr_t LightEmission = 0x174;
         inline constexpr uintptr_t LightInfluence = 0x178;
         inline constexpr uintptr_t Texture = 0x128;
         inline constexpr uintptr_t TextureLength = 0x184;
         inline constexpr uintptr_t TextureSpeed = 0x18c;
         inline constexpr uintptr_t Width0 = 0x190;
         inline constexpr uintptr_t Width1 = 0x194;
         inline constexpr uintptr_t ZOffset = 0x198;
    }

    namespace BloomEffect {
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t Intensity = 0xa0;
         inline constexpr uintptr_t Size = 0xa4;
         inline constexpr uintptr_t Threshold = 0xa8;
    }

    namespace BlurEffect {
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t Size = 0xa0;
    }

    namespace BoundFuncDescriptor {
         inline constexpr uintptr_t Function = 0xb0;
         inline constexpr uintptr_t Name = 0x8;
    }

    namespace ByteCode {
         inline constexpr uintptr_t Pointer = 0x18;
         inline constexpr uintptr_t Size = 0x30;
    }

    namespace CachedItem {
         inline constexpr uintptr_t FileMeshData = 0x40;
    }

    namespace Camera {
         inline constexpr uintptr_t CFrame = 0xc0;
         inline constexpr uintptr_t CameraSubject = 0xb0;
         inline constexpr uintptr_t CameraType = 0x120;
         inline constexpr uintptr_t FieldOfView = 0x128;
         inline constexpr uintptr_t ImagePlaneDepth = 0x2d4;
         inline constexpr uintptr_t Position = 0xe4;
         inline constexpr uintptr_t Rotation = 0xc0;
         inline constexpr uintptr_t Viewport = 0x284;
         inline constexpr uintptr_t ViewportSize = 0x2c4;
    }

    namespace CharacterMesh {
         inline constexpr uintptr_t BaseTextureId = 0xb0;
         inline constexpr uintptr_t BodyPart = 0x130;
         inline constexpr uintptr_t MeshId = 0xe0;
         inline constexpr uintptr_t OverlayTextureId = 0x110;
    }

    namespace ChunkEntry {
         inline constexpr uintptr_t Shape = 0x10;
         inline constexpr uintptr_t State = 0xc;
         inline constexpr uintptr_t X = 0x0;
         inline constexpr uintptr_t Y = 0x4;
         inline constexpr uintptr_t Z = 0x8;
    }

    namespace ChunkMeshShape {
         inline constexpr uintptr_t Indices = 0x38;
         inline constexpr uintptr_t TriangleCount = 0x40;
         inline constexpr uintptr_t VertexCount = 0x30;
         inline constexpr uintptr_t Vertices = 0x20;
    }

    namespace ClassDescriptor {
         inline constexpr uintptr_t FunctionDescriptors = 0xd0;
         inline constexpr uintptr_t Name = 0x8;
    }

    namespace ClickDetector {
         inline constexpr uintptr_t MaxActivationDistance = 0xd0;
         inline constexpr uintptr_t MouseIcon = 0xb0;
    }

    namespace Closure {
         inline constexpr uintptr_t isC = 0x6;
    }

    namespace Clothing {
         inline constexpr uintptr_t Color3 = 0x108;
         inline constexpr uintptr_t Template = 0xe8;
    }

    namespace ColorCorrectionEffect {
         inline constexpr uintptr_t Brightness = 0xac;
         inline constexpr uintptr_t Contrast = 0xb0;
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t TintColor = 0xa0;
    }

    namespace ColorGradingEffect {
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t TonemapperPreset = 0xa0;
    }

    namespace Coroutine {
         inline constexpr uintptr_t Create = 0x5addf70;
         inline constexpr uintptr_t Finally = 0x5ae10b0;
         inline constexpr uintptr_t IsYieldable = 0x5ade8a0;
         inline constexpr uintptr_t Running = 0x5ade830;
         inline constexpr uintptr_t Status = 0x5adbaa0;
         inline constexpr uintptr_t Wrap = 0x5ade510;
         inline constexpr uintptr_t Yield = 0x5ade7d0;
    }

    namespace DataModel {
         inline constexpr uintptr_t CreatorId = 0x190;
         inline constexpr uintptr_t GameId = 0x198;
         inline constexpr uintptr_t GameLoaded = 0x5b8;
         inline constexpr uintptr_t JobId = 0x108;
         inline constexpr uintptr_t PlaceId = 0x1a0;
         inline constexpr uintptr_t PlaceVersion = 0x34;
         inline constexpr uintptr_t PrimitiveCount = 0x1a5;
         inline constexpr uintptr_t ScriptContext = 0x440;
         inline constexpr uintptr_t ServerIP = 0x5a0;
         inline constexpr uintptr_t ToRenderView1 = 0x1d8;
         inline constexpr uintptr_t ToRenderView2 = 0x8;
         inline constexpr uintptr_t ToRenderView3 = 0x28;
         inline constexpr uintptr_t Workspace = 0x168;
    }

    namespace DepthOfFieldEffect {
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t FarIntensity = 0xa0;
         inline constexpr uintptr_t FocusDistance = 0xa4;
         inline constexpr uintptr_t InFocusRadius = 0xa8;
         inline constexpr uintptr_t NearIntensity = 0xac;
    }

    namespace DeviceD3D11 {
         inline constexpr uintptr_t Context = 0x190;
         inline constexpr uintptr_t ContextObj = 0x1c0;
         inline constexpr uintptr_t ContextPtr = 0x190;
         inline constexpr uintptr_t DevicePtr = 0x188;
         inline constexpr uintptr_t SwapChainPtr = 0x90;
         inline constexpr uintptr_t VTableRva = 0x719fad8;
    }

    namespace DragDetector {
         inline constexpr uintptr_t ActivatedCursorIcon = 0x188;
         inline constexpr uintptr_t CursorIcon = 0xb0;
         inline constexpr uintptr_t MaxActivationDistance = 0xd0;
         inline constexpr uintptr_t MaxDragAngle = 0x270;
         inline constexpr uintptr_t MaxDragTranslation = 0x234;
         inline constexpr uintptr_t MaxForce = 0x274;
         inline constexpr uintptr_t MaxTorque = 0x278;
         inline constexpr uintptr_t MinDragAngle = 0x27c;
         inline constexpr uintptr_t MinDragTranslation = 0x240;
         inline constexpr uintptr_t ReferenceInstance = 0x1b8;
         inline constexpr uintptr_t Responsiveness = 0x288;
    }

    namespace FFlagList {
         inline constexpr uintptr_t Head = 0x8;
         inline constexpr uintptr_t NodeName = 0x10;
         inline constexpr uintptr_t NodeNext = 0x0;
         inline constexpr uintptr_t NodeValue = 0x30;
         inline constexpr uintptr_t Pointer = 0x865e868;
         inline constexpr uintptr_t ValueOffset = 0x20;
    }

    namespace FakeDataModel {
         inline constexpr uintptr_t Pointer = 0x8f8e968;
         inline constexpr uintptr_t RealDataModel = 0x1f8;
    }

    namespace FastCluster {
         inline constexpr uintptr_t BindingSubobject = 0x90;
         inline constexpr uintptr_t EntityBegin = 0x48;
         inline constexpr uintptr_t EntityEnd = 0x50;
         inline constexpr uintptr_t VTableRva = 0x7204690;
         inline constexpr uintptr_t VTableRvaSub = 0x7204558;
    }

    namespace FastClusterBinding {
         inline constexpr uintptr_t Owner = 0x60;
    }

    namespace FastClusterEntity {
         inline constexpr uintptr_t AlphaByte = 0x14;
         inline constexpr uintptr_t BBoxMaxX = 0xa4;
         inline constexpr uintptr_t BBoxMaxY = 0xa8;
         inline constexpr uintptr_t BBoxMaxZ = 0xac;
         inline constexpr uintptr_t BBoxMinX = 0x98;
         inline constexpr uintptr_t BBoxMinY = 0x9c;
         inline constexpr uintptr_t BBoxMinZ = 0xa0;
         inline constexpr uintptr_t ContextPtr = 0x8;
         inline constexpr uintptr_t DecalMaterialPtr = 0x48;
         inline constexpr uintptr_t MaterialControlBlock = 0x28;
         inline constexpr uintptr_t MaterialPtr = 0x20;
         inline constexpr uintptr_t MeshVTableRva = 0x7205838;
         inline constexpr uintptr_t PrimitiveIndexArrayPtr = 0x80;
         inline constexpr uintptr_t PrimitivePtr = 0x8;
         inline constexpr uintptr_t RenderQueueId = 0x10;
         inline constexpr uintptr_t TechniqueArrayPtr = 0x70;
         inline constexpr uintptr_t VTableRva = 0x72057f0;
         inline constexpr uintptr_t VertexBuffer = 0x50;
    }

    namespace FastClusterMeshGenerator {
         inline constexpr uintptr_t VTableRva = 0x7205838;
    }

    namespace FileMeshData {
         inline constexpr uintptr_t AABBMax = 0x18c;
         inline constexpr uintptr_t AABBMin = 0x180;
         inline constexpr uintptr_t Faces = 0x30;
         inline constexpr uintptr_t FacesEnd = 0x38;
         inline constexpr uintptr_t Vertices = 0x0;
         inline constexpr uintptr_t VerticesEnd = 0x8;
    }

    namespace FunctionDescriptor {
         inline constexpr uintptr_t Function = 0xb0;
    }

    namespace Functions {
         inline constexpr uintptr_t GlobalCollectGarbage = 0x437f380;
         inline constexpr uintptr_t GlobalDelay = 0x437fc10;
         inline constexpr uintptr_t GlobalElapsedTime = 0x4380390;
         inline constexpr uintptr_t GlobalGetFenv = 0x4383990;
         inline constexpr uintptr_t GlobalLoadstring = 0x4380410;
         inline constexpr uintptr_t GlobalPluginManager = 0x4380ad0;
         inline constexpr uintptr_t GlobalPrint = 0x4380fb0;
         inline constexpr uintptr_t GlobalPrintIdentity = 0x4380fd0;
         inline constexpr uintptr_t GlobalRequire = 0x43810d0;
         inline constexpr uintptr_t GlobalSetFenv = 0x4383ad0;
         inline constexpr uintptr_t GlobalSettings = 0x43816a0;
         inline constexpr uintptr_t GlobalSpawn = 0x4381b40;
         inline constexpr uintptr_t GlobalStats = 0x43822c0;
         inline constexpr uintptr_t GlobalTick = 0x43827f0;
         inline constexpr uintptr_t GlobalTime = 0x4382870;
         inline constexpr uintptr_t GlobalUserSettings = 0x4382a80;
         inline constexpr uintptr_t GlobalVersion = 0x4382ea0;
         inline constexpr uintptr_t GlobalWait = 0x4382f90;
         inline constexpr uintptr_t GlobalWarn = 0x4383190;
    }

    namespace GeometryD3D11 {
         inline constexpr uintptr_t VTableRva = 0x71a0008;
    }

    namespace GuiBase2D {
         inline constexpr uintptr_t AbsolutePosition = 0xf4;
         inline constexpr uintptr_t AbsoluteRotation = 0xd0;
         inline constexpr uintptr_t AbsoluteSize = 0xfc;
    }

    namespace GuiObject {
         inline constexpr uintptr_t BackgroundColor3 = 0x2d8;
         inline constexpr uintptr_t BackgroundTransparency = 0x2fc;
         inline constexpr uintptr_t BorderColor3 = 0x2e4;
         inline constexpr uintptr_t Image = 0x670;
         inline constexpr uintptr_t ImageRectOffset = 0x7c4;
         inline constexpr uintptr_t LayoutOrder = 0x314;
         inline constexpr uintptr_t Position = 0x2a8;
         inline constexpr uintptr_t RichText = 0x7c8;
         inline constexpr uintptr_t Rotation = 0xd0;
         inline constexpr uintptr_t Size = 0x2c8;
         inline constexpr uintptr_t Text = 0xa30;
         inline constexpr uintptr_t TextColor3 = 0xae0;
         inline constexpr uintptr_t Visible = 0x78d;
         inline constexpr uintptr_t ZIndex = 0x33c;
         inline constexpr uintptr_t ScreenGui_Enabled = 0x260;
    }

    namespace HandleAdornment {
         inline constexpr uintptr_t CFrame = 0x100;
    }

    namespace Humanoid {
         inline constexpr uintptr_t AutoJumpEnabled = 0x1cc;
         inline constexpr uintptr_t AutoRotate = 0x1cd;
         inline constexpr uintptr_t AutomaticScalingEnabled = 0x1ce;
         inline constexpr uintptr_t BreakJointsOnDeath = 0x1d0;
         inline constexpr uintptr_t CameraOffset = 0x110;
         inline constexpr uintptr_t DisplayDistanceType = 0x174;
         inline constexpr uintptr_t DisplayName = 0xa0;
         inline constexpr uintptr_t EvaluateStateMachine = 0x1d1;
         inline constexpr uintptr_t FloorMaterial = 0x178;
         inline constexpr uintptr_t Health = 0x184;
         inline constexpr uintptr_t HealthDisplayDistance = 0x17c;
         inline constexpr uintptr_t HealthDisplayType = 0x180;
         inline constexpr uintptr_t HipHeight = 0x188;
         inline constexpr uintptr_t HumanoidRootPart = 0x468;
         inline constexpr uintptr_t HumanoidState = 0x8b0;
         inline constexpr uintptr_t HumanoidStateID = 0x20;
         inline constexpr uintptr_t IsWalking = 0xa46;
         inline constexpr uintptr_t Jump = 0x1d4;
         inline constexpr uintptr_t JumpHeight = 0x198;
         inline constexpr uintptr_t JumpPower = 0x19c;
         inline constexpr uintptr_t MaxHealth = 0x1a0;
         inline constexpr uintptr_t MaxSlopeAngle = 0x1a4;
         inline constexpr uintptr_t MoveDirection = 0x134;
         inline constexpr uintptr_t MoveToPart = 0x100;
         inline constexpr uintptr_t MoveToPoint = 0x158;
         inline constexpr uintptr_t NameDisplayDistance = 0x1a8;
         inline constexpr uintptr_t NameOcclusion = 0x1ac;
         inline constexpr uintptr_t PlatformStand = 0x1d6;
         inline constexpr uintptr_t PlatformStatePointer = 0x8b0;
         inline constexpr uintptr_t RequiresNeck = 0x1d7;
         inline constexpr uintptr_t RigType = 0x1b8;
         inline constexpr uintptr_t SeatPart = 0xf0;
         inline constexpr uintptr_t Sit = 0x1d8;
         inline constexpr uintptr_t TargetPoint = 0x140;
         inline constexpr uintptr_t UseJumpPower = 0x1da;
         inline constexpr uintptr_t WalkTimer = 0x3f0;
         inline constexpr uintptr_t WalkToPoint = 0x158;
         inline constexpr uintptr_t Walkspeed = 0x1c8;
         inline constexpr uintptr_t WalkspeedCheck = 0x3a4;
    }

    namespace Instance {
         inline constexpr uintptr_t ChildrenEnd = 0x8;
         inline constexpr uintptr_t ChildrenStart = 0x70;
         inline constexpr uintptr_t ClassBase = 0x1b0;
         inline constexpr uintptr_t ClassDescriptor = 0x18;
         inline constexpr uintptr_t ClassName = 0x8;
         inline constexpr uintptr_t Name = 0x0;
         inline constexpr uintptr_t NameContainer = 0x68;
         inline constexpr uintptr_t Parent = 0x60;
         inline constexpr uintptr_t SetParent = 0x1d27e60;
         inline constexpr uintptr_t This = 0x8;
         inline constexpr uintptr_t GetAttribute = 0x1D2FA60;
    }

    namespace JointInstance {
         inline constexpr uintptr_t Part0 = 0x100;
         inline constexpr uintptr_t Part1 = 0x110;
    }

    namespace LRUHolder {
         inline constexpr uintptr_t MemEnforcedLRUCache = 0x20;
    }

    namespace LRUNode {
         inline constexpr uintptr_t AssetID = 0x10;
         inline constexpr uintptr_t CachedItem = 0x40;
         inline constexpr uintptr_t Next = 0x0;
    }

    namespace Lighting {
         inline constexpr uintptr_t Ambient = 0xb8;
         inline constexpr uintptr_t Brightness = 0x100;
         inline constexpr uintptr_t ClockTime = 0xb0;
         inline constexpr uintptr_t ColorShift_Bottom = 0xc4;
         inline constexpr uintptr_t ColorShift_Top = 0xd0;
         inline constexpr uintptr_t EnvironmentDiffuseScale = 0x104;
         inline constexpr uintptr_t EnvironmentSpecularScale = 0x108;
         inline constexpr uintptr_t ExposureCompensation = 0x10c;
         inline constexpr uintptr_t FogColor = 0xdc;
         inline constexpr uintptr_t FogEnd = 0x114;
         inline constexpr uintptr_t FogStart = 0x118;
         inline constexpr uintptr_t GeographicLatitude = 0x11c;
         inline constexpr uintptr_t GlobalShadows = 0x12c;
         inline constexpr uintptr_t GradientBottom = 0x178;
         inline constexpr uintptr_t GradientTop = 0x138;
         inline constexpr uintptr_t LightColor = 0x144;
         inline constexpr uintptr_t LightDirection = 0x150;
         inline constexpr uintptr_t MoonPosition = 0x16c;
         inline constexpr uintptr_t OutdoorAmbient = 0xe8;
         inline constexpr uintptr_t Sky = 0x1b0;
         inline constexpr uintptr_t Source = 0x15c;
         inline constexpr uintptr_t SunPosition = 0x160;
         inline constexpr uintptr_t ShadowSoftness = 0x124;
    }

    namespace LocalScript {
         inline constexpr uintptr_t ByteCode = 0x178;
         inline constexpr uintptr_t GUID = 0xb8;
         inline constexpr uintptr_t Hash = 0x188;
    }

    namespace LuaB {
         inline constexpr uintptr_t LuaBAssert = 0x5aae900;
         inline constexpr uintptr_t LuaBError = 0x5aa9350;
         inline constexpr uintptr_t LuaBGcinfo = 0x5aac780;
         inline constexpr uintptr_t LuaBGetFenv = 0x5aaae00;
         inline constexpr uintptr_t LuaBGetMetatable = 0x5aaa290;
         inline constexpr uintptr_t LuaBNewProxy = 0x5aaf4f0;
         inline constexpr uintptr_t LuaBNext = 0x5aade60;
         inline constexpr uintptr_t LuaBPrint = 0x5aa8f00;
         inline constexpr uintptr_t LuaBRawEqual = 0x5aab0f0;
         inline constexpr uintptr_t LuaBRawGet = 0x5aab200;
         inline constexpr uintptr_t LuaBRawLen = 0x5aac6e0;
         inline constexpr uintptr_t LuaBRawSet = 0x5aabb70;
         inline constexpr uintptr_t LuaBSelect = 0x5aae9b0;
         inline constexpr uintptr_t LuaBSetFenv = 0x5aaaec0;
         inline constexpr uintptr_t LuaBSetMetatable = 0x5aaa420;
         inline constexpr uintptr_t LuaBTonumber = 0x5aa8fc0;
         inline constexpr uintptr_t LuaBTostring = 0x5aaf490;
         inline constexpr uintptr_t LuaBType = 0x5aac7a0;
         inline constexpr uintptr_t LuaBTypeof = 0x5aad300;
    }

    namespace LuaCoroutine {
         inline constexpr uintptr_t Create = 0x5addf70;
         inline constexpr uintptr_t Finally = 0x5ae10b0;
         inline constexpr uintptr_t IsYieldable = 0x5ade8a0;
         inline constexpr uintptr_t Running = 0x5ade830;
         inline constexpr uintptr_t Status = 0x5adbaa0;
         inline constexpr uintptr_t Wrap = 0x5ade510;
         inline constexpr uintptr_t Yield = 0x5ade7d0;
    }

    namespace LuaState {
         inline constexpr uintptr_t Base = 0x68;
         inline constexpr uintptr_t Global = 0x60;
         inline constexpr uintptr_t Stack = 0x58;
         inline constexpr uintptr_t StackLast = 0x48;
         inline constexpr uintptr_t Top = 0x70;
         inline constexpr uintptr_t Tt = 0x0;
         inline constexpr uintptr_t Ci = 0x78;
    }

    namespace Luau {
         inline constexpr uintptr_t ClosureIsC = 0x6;
         inline constexpr uintptr_t GlobalMainThread = 0x60;
         inline constexpr uintptr_t Node_Key = 0x10;
         inline constexpr uintptr_t Node_KeyTag = 0x1c;
         inline constexpr uintptr_t Node_Size = 0x20;
         inline constexpr uintptr_t StateBase = 0x68;
         inline constexpr uintptr_t StateGlobal = 0x60;
         inline constexpr uintptr_t StateTop = 0x70;
         inline constexpr uintptr_t TString_Data = 0x18;
         inline constexpr uintptr_t TString_Hash = 0x10;
         inline constexpr uintptr_t TString_Length = 0x14;
         inline constexpr uintptr_t TString_Tag = 0x0;
         inline constexpr uintptr_t TValueSize = 0x10;
         inline constexpr uintptr_t TValue_Size = 0x10;
         inline constexpr uintptr_t TValue_Tag = 0xc;
         inline constexpr uintptr_t TValue_TagNumber = 0x3;
         inline constexpr uintptr_t TValue_TagString = 0x5;
         inline constexpr uintptr_t TValue_TagTable = 0x6;
         inline constexpr uintptr_t TValue_Value = 0x0;
         inline constexpr uintptr_t Table_Array = 0x20;
         inline constexpr uintptr_t Table_NodeArray = 0x28;
         inline constexpr uintptr_t Table_SizeArray = 0x8;
         inline constexpr uintptr_t Table_Tag = 0x0;
         inline constexpr uintptr_t Table_lsizenode = 0xc;
         inline constexpr uintptr_t luaB_assert = 0x5aae900;
         inline constexpr uintptr_t luaB_error = 0x5aa9350;
         inline constexpr uintptr_t luaB_gcinfo = 0x5aac780;
         inline constexpr uintptr_t luaB_getfenv = 0x5aaae00;
         inline constexpr uintptr_t luaB_getmetatable = 0x5aaa290;
         inline constexpr uintptr_t luaB_newproxy = 0x5aaf4f0;
         inline constexpr uintptr_t luaB_next = 0x5aade60;
         inline constexpr uintptr_t luaB_print = 0x5aa8f00;
         inline constexpr uintptr_t luaB_rawequal = 0x5aab0f0;
         inline constexpr uintptr_t luaB_rawget = 0x5aab200;
         inline constexpr uintptr_t luaB_rawlen = 0x5aac6e0;
         inline constexpr uintptr_t luaB_rawset = 0x5aabb70;
         inline constexpr uintptr_t luaB_select = 0x5aae9b0;
         inline constexpr uintptr_t luaB_setfenv = 0x5aaaec0;
         inline constexpr uintptr_t luaB_setmetatable = 0x5aaa420;
         inline constexpr uintptr_t luaB_tonumber = 0x5aa8fc0;
         inline constexpr uintptr_t luaB_tostring = 0x5aaf490;
         inline constexpr uintptr_t luaB_type = 0x5aac7a0;
         inline constexpr uintptr_t luaB_typeof = 0x5aad300;
         inline constexpr uintptr_t StateCI = 0x78;
    }

    namespace LuauGlobal {
         inline constexpr uintptr_t mainthread = 0x60;
    }

    namespace MaterialColors {
         inline constexpr uintptr_t Asphalt = 0x30;
         inline constexpr uintptr_t Basalt = 0x27;
         inline constexpr uintptr_t Brick = 0xf;
         inline constexpr uintptr_t Cobblestone = 0x33;
         inline constexpr uintptr_t Concrete = 0xc;
         inline constexpr uintptr_t CrackedLava = 0x2d;
         inline constexpr uintptr_t Glacier = 0x1b;
         inline constexpr uintptr_t Grass = 0x6;
         inline constexpr uintptr_t Ground = 0x2a;
         inline constexpr uintptr_t Ice = 0x36;
         inline constexpr uintptr_t LeafyGrass = 0x39;
         inline constexpr uintptr_t Limestone = 0x3f;
         inline constexpr uintptr_t Mud = 0x24;
         inline constexpr uintptr_t Pavement = 0x42;
         inline constexpr uintptr_t Rock = 0x18;
         inline constexpr uintptr_t Salt = 0x3c;
         inline constexpr uintptr_t Sand = 0x12;
         inline constexpr uintptr_t Sandstone = 0x21;
         inline constexpr uintptr_t Slate = 0x9;
         inline constexpr uintptr_t Snow = 0x1e;
         inline constexpr uintptr_t WoodPlanks = 0x15;
    }

    namespace MaterialLayer {
         inline constexpr uintptr_t ColorData = 0x24;
         inline constexpr uintptr_t FillModeByte = 0x11;
         inline constexpr uintptr_t Flags2 = 0x20;
         inline constexpr uintptr_t MatFlags = 0x18;
         inline constexpr uintptr_t Param = 0x1c;
         inline constexpr uintptr_t Stride = 0x88;
         inline constexpr uintptr_t Stride = 0x88;
    }

    namespace MemEnforcedLRUCache {
         inline constexpr uintptr_t Head = 0x8;
    }

    namespace MeshContentProvider {
         inline constexpr uintptr_t AssetID = 0x10;
         inline constexpr uintptr_t Cache = 0xc0;
         inline constexpr uintptr_t LRUCache = 0x20;
         inline constexpr uintptr_t LRUHolder = 0xc0;
         inline constexpr uintptr_t MeshData = 0x40;
         inline constexpr uintptr_t ToMeshData = 0x40;
    }

    namespace MeshData {
         inline constexpr uintptr_t FaceEnd = 0x38;
         inline constexpr uintptr_t FaceStart = 0x30;
         inline constexpr uintptr_t VertexEnd = 0x8;
         inline constexpr uintptr_t VertexStart = 0x0;
    }

    namespace MeshPart {
         inline constexpr uintptr_t MeshId = 0x2f8;
         inline constexpr uintptr_t MeshSize = 0x210;
         inline constexpr uintptr_t Texture = 0x328;
    }

    namespace Misc {
         inline constexpr uintptr_t Adornee = 0xd8;
         inline constexpr uintptr_t AnimationId = 0xa8;
         inline constexpr uintptr_t StringLength = 0x10;
         inline constexpr uintptr_t Value = 0xa0;
    }

    namespace Model {
         inline constexpr uintptr_t PrimaryPart = 0x240;
         inline constexpr uintptr_t Scale = 0x12c;
    }

    namespace ModuleScript {
         inline constexpr uintptr_t ByteCode = 0x120;
         inline constexpr uintptr_t GUID = 0xb8;
         inline constexpr uintptr_t Hash = 0x348;
         inline constexpr uintptr_t IsCoreScript = 0x93;
    }

    namespace MouseService {
         inline constexpr uintptr_t InputObject = 0xe8;
         inline constexpr uintptr_t InputObject2 = 0xf8;
         inline constexpr uintptr_t MousePosition = 0xbc;
    }

    namespace ParticleEmitter {
         inline constexpr uintptr_t Acceleration = 0x1c8;
         inline constexpr uintptr_t Brightness = 0x204;
         inline constexpr uintptr_t Drag = 0x208;
         inline constexpr uintptr_t Lifetime = 0x1dc;
         inline constexpr uintptr_t LightEmission = 0x220;
         inline constexpr uintptr_t LightInfluence = 0x224;
         inline constexpr uintptr_t Rate = 0x230;
         inline constexpr uintptr_t RotSpeed = 0x1e4;
         inline constexpr uintptr_t Rotation = 0x1ec;
         inline constexpr uintptr_t Speed = 0x1f4;
         inline constexpr uintptr_t SpreadAngle = 0x1fc;
         inline constexpr uintptr_t Texture = 0x1a8;
         inline constexpr uintptr_t TimeScale = 0x244;
         inline constexpr uintptr_t VelocityInheritance = 0x248;
         inline constexpr uintptr_t ZOffset = 0x24c;
    }

    namespace Player {
         inline constexpr uintptr_t AccountAge = 0x364;
         inline constexpr uintptr_t CameraMode = 0x378;
         inline constexpr uintptr_t DisplayName = 0x120;
         inline constexpr uintptr_t HealthDisplayDistance = 0x3a0;
         inline constexpr uintptr_t LocalPlayer = 0x118;
         inline constexpr uintptr_t LocaleId = 0x740;
         inline constexpr uintptr_t MaxZoomDistance = 0x370;
         inline constexpr uintptr_t MinZoomDistance = 0x374;
         inline constexpr uintptr_t ModelInstance = 0x2a0;
         inline constexpr uintptr_t Mouse = 0x11f0;
         inline constexpr uintptr_t NameDisplayDistance = 0x3b0;
         inline constexpr uintptr_t Team = 0x2e0;
         inline constexpr uintptr_t TeamColor = 0x3b8;
         inline constexpr uintptr_t UserId = 0xb8;
    }

    namespace PlayerMouse {
         inline constexpr uintptr_t Icon = 0xb0;
         inline constexpr uintptr_t Workspace = 0x138;
    }

    namespace Primitive {
         inline constexpr uintptr_t AssemblyAngularVelocity = 0xec;
         inline constexpr uintptr_t AssemblyLinearVelocity = 0xe0;
         inline constexpr uintptr_t Flags = 0x1be;
         inline constexpr uintptr_t Geometry = 0x210;
         inline constexpr uintptr_t Material = 0x24e;
         inline constexpr uintptr_t MaterialType = 0x24e;
         inline constexpr uintptr_t Owner = 0x218;
         inline constexpr uintptr_t Position = 0xd4;
         inline constexpr uintptr_t Rotation = 0xb0;
         inline constexpr uintptr_t Size = 0x1c4;
         inline constexpr uintptr_t Validate = 0x6;
    }

    namespace PrimitiveFlags {
         inline constexpr uintptr_t Anchored = 0x2;
         inline constexpr uintptr_t CanCollide = 0x8;
         inline constexpr uintptr_t CanQuery = 0x20;
         inline constexpr uintptr_t CanTouch = 0x10;
    }

    namespace ProximityPrompt {
         inline constexpr uintptr_t ActionText = 0x98;
         inline constexpr uintptr_t Enabled = 0x11e;
         inline constexpr uintptr_t GamepadKeyCode = 0x104;
         inline constexpr uintptr_t HoldDuration = 0x108;
         inline constexpr uintptr_t KeyCode = 0x10c;
         inline constexpr uintptr_t MaxActivationDistance = 0x110;
         inline constexpr uintptr_t ObjectText = 0xb8;
         inline constexpr uintptr_t RequiresLineOfSight = 0x11f;
    }

    namespace RakNet {
         inline constexpr uintptr_t Connect = 0x288c2b0;
         inline constexpr uintptr_t DeallocatePacket = 0x288e9f0;
         inline constexpr uintptr_t Receive = 0x288e2f0;
         inline constexpr uintptr_t Send = 0x288dc00;
         inline constexpr uintptr_t Shutdown = 0x288ca80;
         inline constexpr uintptr_t Startup = 0x2889ea0;
         inline constexpr uintptr_t VTableRva = 0x71a0638;
    }

    namespace Raycast {
         inline constexpr uintptr_t RaycastBoundDesc = 0x870b040;
         inline constexpr uintptr_t RaycastBoundFn = 0xb0;
         inline constexpr uintptr_t RaycastBoundFnRva = 0xd34420;
         inline constexpr uintptr_t RaycastDescriptorRva = 0x870b040;
    }

    namespace RegionNode {
         inline constexpr uintptr_t Key = 0x10;
         inline constexpr uintptr_t SlotStride = 0x10;
         inline constexpr uintptr_t Slots = 0x68;
    }

    namespace RegionSlot {
         inline constexpr uintptr_t Entry = 0x8;
    }

    namespace RemoteEvent {
         inline constexpr uintptr_t FireServer = 0x34e0080;
         inline constexpr uintptr_t InstanceArgumentMeta0 = 0x8f02d40;
         inline constexpr uintptr_t InstanceArgumentMeta1 = 0x8e37f40;
         inline constexpr uintptr_t OnClientEvent = 0x34df170;
         inline constexpr uintptr_t OnServerEvent = 0x34df120;
    }

    namespace RemoteFunction {
         inline constexpr uintptr_t InvokeServer = 0x35b9980;
         inline constexpr uintptr_t OnClientInvoke = 0x35ba0d0;
    }

    namespace RemoteSpy {
         inline constexpr uintptr_t RemoteEventVTableRva = 0x71fc8f0;
    }

    namespace RenderJob {
         inline constexpr uintptr_t FakeDataModel = 0x38;
         inline constexpr uintptr_t RealDataModel = 0x1f0;
         inline constexpr uintptr_t RenderView = 0x1e0;
    }

    namespace RenderView {
         inline constexpr uintptr_t DeviceD3D11 = 0x10;
         inline constexpr uintptr_t VisualEngine = 0x20;
    }

    namespace RunService {
         inline constexpr uintptr_t HeartbeatFPS = 0xc8;
         inline constexpr uintptr_t HeartbeatTask = 0xd8;
    }

    namespace Script {
         inline constexpr uintptr_t ByteCode = 0x178;
         inline constexpr uintptr_t GUID = 0xb8;
         inline constexpr uintptr_t Hash = 0x188;
    }

    namespace ScriptContext {
         inline constexpr uintptr_t VTable = 0x7269f98;
         inline constexpr uintptr_t VmWrapper = 0x298;
    }

    namespace Seat {
         inline constexpr uintptr_t Occupant = 0x200;
    }

    namespace Signals {
         inline constexpr uintptr_t IsLegalSendEvent = 0x3cca190;
    }

    namespace Sky {
         inline constexpr uintptr_t DrawAdv = 0x392c7c4;
         inline constexpr uintptr_t DrawCubeCallB = 0x37f6ebf;
         inline constexpr uintptr_t MoonAngularSize = 0x22c;
         inline constexpr uintptr_t MoonTextureId = 0xb0;
         inline constexpr uintptr_t SkyboxBk = 0xe0;
         inline constexpr uintptr_t SkyboxDn = 0x110;
         inline constexpr uintptr_t SkyboxFt = 0x140;
         inline constexpr uintptr_t SkyboxLf = 0x170;
         inline constexpr uintptr_t SkyboxOrientation = 0x220;
         inline constexpr uintptr_t SkyboxRt = 0x1a0;
         inline constexpr uintptr_t SkyboxUp = 0x1d0;
         inline constexpr uintptr_t StarCount = 0x230;
         inline constexpr uintptr_t SunAngularSize = 0x234;
         inline constexpr uintptr_t SunTextureId = 0x200;
    }

    namespace SmoothClusterGeometry {
         inline constexpr uintptr_t GridOld = 0x48;
         inline constexpr uintptr_t RegionCount = 0xb0;
         inline constexpr uintptr_t Regions = 0xa8;
    }

    namespace Sound {
         inline constexpr uintptr_t IsPlaying = 0x130;
         inline constexpr uintptr_t Looped = 0x12d;
         inline constexpr uintptr_t PlaybackSpeed = 0x10c;
         inline constexpr uintptr_t RollOffMaxDistance = 0x110;
         inline constexpr uintptr_t RollOffMinDistance = 0x114;
         inline constexpr uintptr_t SoundGroup = 0xd0;
         inline constexpr uintptr_t SoundId = 0xb0;
         inline constexpr uintptr_t Volume = 0x120;
    }

    namespace SpawnLocation {
         inline constexpr uintptr_t AllowTeamChangeOnTouch = 0x1d8;
         inline constexpr uintptr_t Enabled = 0x1d9;
         inline constexpr uintptr_t ForcefieldDuration = 0x1d0;
         inline constexpr uintptr_t Neutral = 0x1da;
         inline constexpr uintptr_t TeamColor = 0x1d4;
    }

    namespace SpecialMesh {
         inline constexpr uintptr_t MeshId = 0xe0;
         inline constexpr uintptr_t Offset = 0xa0;
         inline constexpr uintptr_t Scale = 0xac;
    }

    namespace SunRaysEffect {
         inline constexpr uintptr_t Enabled = 0x98;
         inline constexpr uintptr_t Intensity = 0xa0;
         inline constexpr uintptr_t Spread = 0xa4;
    }

    namespace SurfaceAppearance {
         inline constexpr uintptr_t AlphaMode = 0x1d8;
         inline constexpr uintptr_t Color = 0x1c0;
         inline constexpr uintptr_t ColorMap = 0xb0;
         inline constexpr uintptr_t EmissiveMaskContent = 0xe0;
         inline constexpr uintptr_t EmissiveStrength = 0x1dc;
         inline constexpr uintptr_t EmissiveTint = 0x1cc;
         inline constexpr uintptr_t MetalnessMap = 0x110;
         inline constexpr uintptr_t NormalMap = 0x140;
         inline constexpr uintptr_t RoughnessMap = 0x170;
    }

    namespace TaskScheduler {
         inline constexpr uintptr_t JobEnd = 0xd0;
         inline constexpr uintptr_t JobName = 0x18;
         inline constexpr uintptr_t JobStart = 0xc8;
         inline constexpr uintptr_t MaxFPS = 0xb0;
         inline constexpr uintptr_t Pointer = 0x8f1e408;
    }

    namespace Team {
         inline constexpr uintptr_t BrickColor = 0xa0;
    }

    namespace TechniqueArray {
         inline constexpr uintptr_t BeginOffset = 0x0;
         inline constexpr uintptr_t EndOffset = 0x8;
         inline constexpr uintptr_t EntryStride = 0x88;
    }

    namespace Terrain {
         inline constexpr uintptr_t GrassLength = 0x1d8;
         inline constexpr uintptr_t MaterialColors = 0x4a0;
         inline constexpr uintptr_t WaterColor = 0x1c8;
         inline constexpr uintptr_t WaterReflectance = 0x1e0;
         inline constexpr uintptr_t WaterTransparency = 0x1e4;
         inline constexpr uintptr_t WaterWaveSize = 0x1e8;
         inline constexpr uintptr_t WaterWaveSpeed = 0x1ec;
    }

    namespace TerrainGrid {
         inline constexpr uintptr_t Grid = 0x238;
         inline constexpr uintptr_t MapHead = 0x30;
         inline constexpr uintptr_t MapSize = 0x38;
         inline constexpr uintptr_t NodeKey = 0x10;
         inline constexpr uintptr_t NodeNext = 0x0;
         inline constexpr uintptr_t NodeOctMask = 0x8c;
         inline constexpr uintptr_t NodeRowIndices = 0x20;
         inline constexpr uintptr_t NodeRows = 0x28;
         inline constexpr uintptr_t NodeStride = 0x30;
         inline constexpr uintptr_t SharedRowsRva = 0x8ae3f70;
    }

    namespace TextButton {
         inline constexpr uintptr_t Selected = 0x6ae;
    }

    namespace TextLabel {
         inline constexpr uintptr_t TextTruncate = 0xb10;
         inline constexpr uintptr_t TextXAlignment = 0xb14;
    }

    namespace Textures {
         inline constexpr uintptr_t Decal_Texture = 0x1c8;
         inline constexpr uintptr_t Texture_Texture = 0x1c8;
    }

    namespace Tool {
         inline constexpr uintptr_t Activate = 0x30b2850;
         inline constexpr uintptr_t CanBeDropped = 0x4a0;
         inline constexpr uintptr_t Deactivate = 0x30b2900;
         inline constexpr uintptr_t Enabled = 0x4a1;
         inline constexpr uintptr_t Grip = 0x494;
         inline constexpr uintptr_t ManualActivationOnly = 0x4a2;
         inline constexpr uintptr_t RequiresHandle = 0x4a3;
         inline constexpr uintptr_t TextureId = 0x348;
         inline constexpr uintptr_t Tooltip = 0x450;
    }

    namespace TriangleMesh {
         inline constexpr uintptr_t Data = 0x20;
    }

    namespace TriangleMeshData {
         inline constexpr uintptr_t CompoundShape = 0x0;
    }

    namespace UnionOperation {
         inline constexpr uintptr_t AssetId = 0x2f8;
    }

    namespace UserInputService {
         inline constexpr uintptr_t WindowInputState = 0x288;
    }

    namespace VehicleSeat {
         inline constexpr uintptr_t MaxSpeed = 0x210;
         inline constexpr uintptr_t SteerFloat = 0x214;
         inline constexpr uintptr_t ThrottleFloat = 0x218;
         inline constexpr uintptr_t Torque = 0x21c;
         inline constexpr uintptr_t TurnSpeed = 0x220;
    }

    namespace VisualEngine {
         inline constexpr uintptr_t Dimensions = 0xb10;
         inline constexpr uintptr_t EntityManager = 0x7c0;
         inline constexpr uintptr_t FakeDataModel = 0xaf0;
         inline constexpr uintptr_t Pointer = 0x8a11808;
         inline constexpr uintptr_t RenderView = 0xc50;
         inline constexpr uintptr_t SceneUpdater = 0xb40;
         inline constexpr uintptr_t ShaderList = 0x80;
         inline constexpr uintptr_t ShaderManager = 0xbb8;
         inline constexpr uintptr_t ShaderProgram = 0x28;
         inline constexpr uintptr_t TechniqueVec = 0x0;
         inline constexpr uintptr_t ViewMatrix = 0x1b0;
    }

    namespace WeldConstraint {
         inline constexpr uintptr_t Part0 = 0xa0;
         inline constexpr uintptr_t Part1 = 0xb0;
    }

    namespace WindowInputState {
         inline constexpr uintptr_t CapsLock = 0x40;
         inline constexpr uintptr_t CurrentTextBox = 0x48;
    }

    namespace Workspace {
         inline constexpr uintptr_t CurrentCamera = 0x4a0;
         inline constexpr uintptr_t DistributedGameTime = 0x4c0;
         inline constexpr uintptr_t ReadOnlyGravity = 0x9c8;
         inline constexpr uintptr_t World = 0x3f8;
    }

    namespace World {
         inline constexpr uintptr_t AirProperties = 0x230;
         inline constexpr uintptr_t FallenPartsDestroyHeight = 0x20c;
         inline constexpr uintptr_t Gravity = 0x218;
         inline constexpr uintptr_t Primitives = 0x2a0;
         inline constexpr uintptr_t worldStepsPerSec = 0x868;
    }

    namespace btConvexHullShape {
         inline constexpr uintptr_t PointCount = 0x20;
         inline constexpr uintptr_t Points = 0x28;
    }

    namespace btGImpactCompoundShape {
         inline constexpr uintptr_t HullStride = 0x80;
         inline constexpr uintptr_t HullsBegin = 0x30;
         inline constexpr uintptr_t HullsEnd = 0x38;
    }

    namespace global_State {
         inline constexpr uintptr_t mainthread = 0x60;
    }

    namespace lua_State {
         inline constexpr uintptr_t Base = 0x68;
         inline constexpr uintptr_t Global = 0x60;
         inline constexpr uintptr_t Stack = 0x58;
         inline constexpr uintptr_t StackLast = 0x48;
         inline constexpr uintptr_t Top = 0x70;
         inline constexpr uintptr_t Tt = 0x0;
         inline constexpr uintptr_t Ci = 0x78;
    }

    namespace VmWrapper {
         inline constexpr uintptr_t LuaState = 0xC8;
    }

}
