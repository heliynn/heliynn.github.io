#pragma once
/* =============================================================
/*                       servyy's offsets                         
/*                  https://servfur.github.io                    
/* -------------------------------------------------------------
/*  Dumped by       : servyy <3                                 
/*  Site            : https://servfur.github.io                  
/*  Roblox Version  : version-4ea8e85481e34f46
/*  Dumper Version  : 2.2.6
/*  Dumped At       : 22:45 13/11/2026 (GMT)
/*  Total Offsets   : 645
/* -------------------------------------------------------------
/*  by servyy <3                                                
/*  https://servfur.github.io                                    
/* =============================================================
*/

#include <cstdint>
#include <string>
namespace Structs {
    inline std::string ClientVersion = "version-4ea8e85481e34f46";

    struct AirProperties {
        char pad_0[0x18];
        float AirDensity; // 0x18
        char pad_1[0x20];
        Vector3 GlobalWind; // 0x3c
    }; // sizeof = 48

    struct AnimationTrack {
        char pad_0[0xa0];
        uintptr_t Animation; // 0xa0
        char pad_1[0x14];
        float Speed; // 0xbc
        float TimePosition; // 0xc0
        char pad_2[0x8];
        bool Looped; // 0xcc
        char pad_3[0x2b];
        uintptr_t Animator; // 0xf8
        char pad_4[0x910];
        bool IsPlaying; // 0xa10
    }; // sizeof = a11

    struct Animator {
        char pad_0[0x920];
        uintptr_t ActiveAnimations; // 0x920
    }; // sizeof = 928

    struct Atmosphere {
        char pad_0[0xa0];
        Color3 Color; // 0xa0
        char pad_1[0xc];
        Color3 Decay; // 0xac
        char pad_2[0xc];
        float Density; // 0xb8
        float Glare; // 0xbc
        float Haze; // 0xc0
        float Offset; // 0xc4
    }; // sizeof = c8

    struct Attachment {
        char pad_0[0xac];
        Vector3 Position; // 0xac
    }; // sizeof = b8

    struct BasePart {
        char pad_0[0xf4];
        float Reflectance; // 0xf4
        char pad_1[0x20];
        float Transparency; // 0x118
        unsigned char Color3; // 0x11c
        char pad_2[0x4];
        bool CastShadow; // 0x120
        bool Locked; // 0x121
        bool Massless; // 0x122
        char pad_3[0x55];
        uintptr_t Primitive; // 0x178
        uintptr_t ClusterNode; // 0x180
        char pad_4[0x18];
        int Shape; // 0x1a0
    }; // sizeof = 1a4

    struct Beam {
        char pad_0[0x128];
        string Texture; // 0x128
        char pad_1[0x20];
        uintptr_t Attachment0; // 0x148
        char pad_2[0x8];
        uintptr_t Attachment1; // 0x158
        char pad_3[0x8];
        float Brightness; // 0x168
        float CurveSize0; // 0x16c
        float CurveSize1; // 0x170
        float LightEmission; // 0x174
        float LightInfluence; // 0x178
        char pad_4[0x8];
        float TextureLength; // 0x184
        char pad_5[0x4];
        float TextureSpeed; // 0x18c
        float Width0; // 0x190
        float Width1; // 0x194
        float ZOffset; // 0x198
    }; // sizeof = 19c

    struct BloomEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        float Intensity; // 0xa0
        float Size; // 0xa4
        float Threshold; // 0xa8
    }; // sizeof = ac

    struct BlurEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        float Size; // 0xa0
    }; // sizeof = a4

    struct BoundFuncDescriptor {
        char pad_0[0x8];
        uintptr_t Name; // 0x8
        char pad_1[0xa0];
        uintptr_t Function; // 0xb0
    }; // sizeof = b8

    struct ByteCode {
        char pad_0[0x18];
        uintptr_t Pointer; // 0x18
        char pad_1[0x10];
        uintptr_t Size; // 0x30
    }; // sizeof = 38

    struct CachedItem {
        char pad_0[0x28];
        unknown FileMeshData; // 0x28
    }; // sizeof = 28

    struct Camera {
        char pad_0[0xb0];
        uintptr_t CameraSubject; // 0xb0
        char pad_1[0x8];
        Matrix3x3 Rotation; // 0xc0
        Matrix3x3 CFrame; // 0xc0
        Vector3 Position; // 0xe4
        char pad_2[0xc];
        int CameraType; // 0x120
        char pad_3[0x4];
        float FieldOfView; // 0x128
        char pad_4[0x158];
        short Viewport; // 0x284
        char pad_5[0x40];
        Vector2 ViewportSize; // 0x2c4
        char pad_6[0x8];
        float ImagePlaneDepth; // 0x2d4
    }; // sizeof = 2d8

    struct CharacterMesh {
        char pad_0[0xb0];
        string BaseTextureId; // 0xb0
        char pad_1[0x30];
        string MeshId; // 0xe0
        char pad_2[0x30];
        string OverlayTextureId; // 0x110
        char pad_3[0x20];
        int BodyPart; // 0x130
    }; // sizeof = 134

    struct ChunkEntry {
        int X; // 0x0
        int Y; // 0x4
        int Z; // 0x8
        int State; // 0xc
        uintptr_t Shape; // 0x10
    }; // sizeof = 18

    struct ChunkMeshShape {
        char pad_0[0x20];
        uintptr_t Vertices; // 0x20
        char pad_1[0x8];
        unsigned int VertexCount; // 0x30
        char pad_2[0x8];
        uintptr_t Indices; // 0x38
        unsigned int TriangleCount; // 0x40
    }; // sizeof = 40

    struct ClassDescriptor {
        char pad_0[0x8];
        string Name; // 0x8
        char pad_1[0xc8];
        uintptr_t FunctionDescriptors; // 0xd0
    }; // sizeof = d8

    struct ClickDetector {
        char pad_0[0xb0];
        string MouseIcon; // 0xb0
        char pad_1[0x20];
        float MaxActivationDistance; // 0xd0
    }; // sizeof = d4

    struct Closure {
        char pad_0[0x6];
        bool isC; // 0x6
    }; // sizeof = 7

    struct Clothing {
        char pad_0[0xe8];
        string Template; // 0xe8
        char pad_1[0x20];
        Color3 Color3; // 0x108
    }; // sizeof = 108

    struct ColorCorrectionEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        Color3 TintColor; // 0xa0
        char pad_2[0xc];
        float Brightness; // 0xac
        float Contrast; // 0xb0
    }; // sizeof = b4

    struct ColorGradingEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        int TonemapperPreset; // 0xa0
    }; // sizeof = a4

    struct Coroutine {
        char pad_0[0x5adbaa0];
        uintptr_t Status; // 0x5adbaa0
        char pad_1[0x24c8];
        uintptr_t Create; // 0x5addf70
        char pad_2[0x598];
        uintptr_t Wrap; // 0x5ade510
        char pad_3[0x2b8];
        uintptr_t Yield; // 0x5ade7d0
        char pad_4[0x58];
        uintptr_t Running; // 0x5ade830
        char pad_5[0x68];
        uintptr_t IsYieldable; // 0x5ade8a0
        char pad_6[0x2808];
        uintptr_t Finally; // 0x5ae10b0
    }; // sizeof = 5ae10b8

    struct DataModel {
        char pad_0[0x8];
        uintptr_t ToRenderView2; // 0x8
        char pad_1[0x18];
        uintptr_t ToRenderView3; // 0x28
        char pad_2[0xd8];
        string JobId; // 0x108
        char pad_3[0x60];
        uintptr_t Workspace; // 0x168
        char pad_4[0x20];
        uintptr_t CreatorId; // 0x190
        uintptr_t GameId; // 0x198
        uintptr_t PlaceId; // 0x1a0
        int PrimitiveCount; // 0x1a5
        char pad_5[0x10];
        int PlaceVersion; // 0x1bc
        char pad_6[0x18];
        uintptr_t ToRenderView1; // 0x1d8
        char pad_7[0x260];
        uintptr_t ScriptContext; // 0x440
        char pad_8[0x158];
        string ServerIP; // 0x5a0
        char pad_9[0x18];
        uintptr_t GameLoaded; // 0x5b8
    }; // sizeof = 5c0

    struct DepthOfFieldEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        float FarIntensity; // 0xa0
        float FocusDistance; // 0xa4
        float InFocusRadius; // 0xa8
        float NearIntensity; // 0xac
    }; // sizeof = b0

    struct DeviceD3D11 {
        char pad_0[0x90];
        uintptr_t SwapChainPtr; // 0x90
        char pad_1[0xf0];
        uintptr_t DevicePtr; // 0x188
        uintptr_t ContextPtr; // 0x190
        uintptr_t Context; // 0x190
        char pad_2[0x20];
        uintptr_t ContextObj; // 0x1c0
        char pad_3[0x719f910];
        uintptr_t VTableRva; // 0x719fad8
    }; // sizeof = 719fae0

    struct DragDetector {
        char pad_0[0xb0];
        string CursorIcon; // 0xb0
        char pad_1[0x20];
        float MaxActivationDistance; // 0xd0
        char pad_2[0xb4];
        string ActivatedCursorIcon; // 0x188
        char pad_3[0x30];
        uintptr_t ReferenceInstance; // 0x1b8
        char pad_4[0x74];
        Vector3 MaxDragTranslation; // 0x234
        Vector3 MinDragTranslation; // 0x240
        char pad_5[0x24];
        float MaxDragAngle; // 0x270
        float MaxForce; // 0x274
        float MaxTorque; // 0x278
        float MinDragAngle; // 0x27c
        char pad_6[0x8];
        float Responsiveness; // 0x288
    }; // sizeof = 28c

    struct FFlagList {
        uintptr_t NodeNext; // 0x0
        uintptr_t Head; // 0x8
        string NodeName; // 0x10
        char pad_0[0x10];
        uintptr_t ValueOffset; // 0x20
        char pad_1[0x8];
        uintptr_t NodeValue; // 0x30
        char pad_2[0x865e830];
        uintptr_t Pointer; // 0x865e868
    }; // sizeof = 865e870

    struct FakeDataModel {
        char pad_0[0x1f8];
        uintptr_t RealDataModel; // 0x1f8
        char pad_1[0x8f8e768];
        uintptr_t Pointer; // 0x8f8e968
    }; // sizeof = 8f8e970

    struct FastCluster {
        char pad_0[0x48];
        uintptr_t EntityBegin; // 0x48
        uintptr_t EntityEnd; // 0x50
        char pad_1[0x38];
        int BindingSubobject; // 0x90
        char pad_2[0x72044c4];
        uintptr_t VTableRvaSub; // 0x7204558
        char pad_3[0x130];
        uintptr_t VTableRva; // 0x7204690
    }; // sizeof = 7204698

    struct FastClusterBinding {
        char pad_0[0x60];
        uintptr_t Owner; // 0x60
    }; // sizeof = 68

    struct FastClusterEntity {
        char pad_0[0x8];
        uintptr_t ContextPtr; // 0x8
        uintptr_t PrimitivePtr; // 0x8
        uintptr_t RenderQueueId; // 0x10
        uintptr_t AlphaByte; // 0x14
        uintptr_t MaterialPtr; // 0x20
        uintptr_t MaterialControlBlock; // 0x28
        char pad_1[0x10];
        uintptr_t DecalMaterialPtr; // 0x48
        uintptr_t VertexBuffer; // 0x50
        char pad_2[0x18];
        uintptr_t TechniqueArrayPtr; // 0x70
        char pad_3[0x8];
        uintptr_t PrimitiveIndexArrayPtr; // 0x80
        char pad_4[0x10];
        uintptr_t BBoxMinX; // 0x98
        uintptr_t BBoxMinY; // 0x9c
        uintptr_t BBoxMinZ; // 0xa0
        uintptr_t BBoxMaxX; // 0xa4
        uintptr_t BBoxMaxY; // 0xa8
        uintptr_t BBoxMaxZ; // 0xac
        char pad_5[0x7205728];
        uintptr_t VTableRva; // 0x72057f0
        char pad_6[0x40];
        uintptr_t MeshVTableRva; // 0x7205838
    }; // sizeof = 7205840

    struct FastClusterMeshGenerator {
        char pad_0[0x7205838];
        uintptr_t VTableRva; // 0x7205838
    }; // sizeof = 7205840

    struct FileMeshData {
        unknown Vertices; // 0x0
        char pad_0[0x8];
        unknown VerticesEnd; // 0x8
        char pad_1[0x28];
        unknown Faces; // 0x30
        char pad_2[0x8];
        unknown FacesEnd; // 0x38
        char pad_3[0x148];
        unknown AABBMin; // 0x180
        char pad_4[0xc];
        unknown AABBMax; // 0x18c
    }; // sizeof = 18c

    struct FunctionDescriptor {
        char pad_0[0xb0];
        uintptr_t Function; // 0xb0
    }; // sizeof = b8

    struct Functions {
        char pad_0[0x437f380];
        uintptr_t GlobalCollectGarbage; // 0x437f380
        char pad_1[0x888];
        uintptr_t GlobalDelay; // 0x437fc10
        char pad_2[0x778];
        uintptr_t GlobalElapsedTime; // 0x4380390
        char pad_3[0x78];
        uintptr_t GlobalLoadstring; // 0x4380410
        char pad_4[0x6b8];
        uintptr_t GlobalPluginManager; // 0x4380ad0
        char pad_5[0x4d8];
        uintptr_t GlobalPrint; // 0x4380fb0
        char pad_6[0x18];
        uintptr_t GlobalPrintIdentity; // 0x4380fd0
        char pad_7[0xf8];
        uintptr_t GlobalRequire; // 0x43810d0
        char pad_8[0x5c8];
        uintptr_t GlobalSettings; // 0x43816a0
        char pad_9[0x498];
        uintptr_t GlobalSpawn; // 0x4381b40
        char pad_10[0x778];
        uintptr_t GlobalStats; // 0x43822c0
        char pad_11[0x528];
        uintptr_t GlobalTick; // 0x43827f0
        char pad_12[0x78];
        uintptr_t GlobalTime; // 0x4382870
        char pad_13[0x208];
        uintptr_t GlobalUserSettings; // 0x4382a80
        char pad_14[0x418];
        uintptr_t GlobalVersion; // 0x4382ea0
        char pad_15[0xe8];
        uintptr_t GlobalWait; // 0x4382f90
        char pad_16[0x1f8];
        uintptr_t GlobalWarn; // 0x4383190
        char pad_17[0x7f8];
        uintptr_t GlobalGetFenv; // 0x4383990
        char pad_18[0x138];
        uintptr_t GlobalSetFenv; // 0x4383ad0
    }; // sizeof = 4383ad8

    struct GeometryD3D11 {
        char pad_0[0x71a0008];
        uintptr_t VTableRva; // 0x71a0008
    }; // sizeof = 71a0010

    struct GuiBase2D {
        char pad_0[0xd0];
        float AbsoluteRotation; // 0xd0
        char pad_1[0x20];
        float AbsolutePosition; // 0xf4
        char pad_2[0x4];
        float AbsoluteSize; // 0xfc
    }; // sizeof = 100

    struct GuiObject {
        char pad_0[0xd0];
        float Rotation; // 0xd0
        char pad_1[0x1d4];
        UDim2 Position; // 0x2a8
        char pad_2[0x10];
        UDim2 Size; // 0x2c8
        Color3 BackgroundColor3; // 0x2d8
        char pad_3[0xc];
        Color3 BorderColor3; // 0x2e4
        char pad_4[0x18];
        float BackgroundTransparency; // 0x2fc
        char pad_5[0x4];
        int BorderSizePixel; // 0x304
        char pad_6[0xc];
        int LayoutOrder; // 0x314
        char pad_7[0x18];
        int SelectionOrder; // 0x330
        char pad_8[0x8];
        int ZIndex; // 0x33c
        char pad_9[0x330];
        string Image; // 0x670
        char pad_10[0x154];
        unknown ImageRectOffset; // 0x7c4
        char pad_11[0x4];
        string RichText; // 0x7c8
        char pad_12[0x268];
        string Text; // 0xa30
        char pad_13[0xb0];
        Color3 TextColor3; // 0xae0
        char pad_14[0x3ad];
        bool Visible; // 0xe8d
    }; // sizeof = e8e

    struct HandleAdornment {
        char pad_0[0x100];
        CFrame CFrame; // 0x100
    }; // sizeof = 100

    struct Highlight {
        char pad_0[0xb0];
        Color3 FillColor; // 0xb0
        char pad_1[0xc];
        Color3 OutlineColor; // 0xbc
        char pad_2[0x10];
        float FillTransparency; // 0xcc
        char pad_3[0x4];
        float OutlineTransparency; // 0xd4
    }; // sizeof = d8

    struct Humanoid {
        char pad_0[0x20];
        int HumanoidStateID; // 0x20
        char pad_1[0x7c];
        string DisplayName; // 0xa0
        char pad_2[0x50];
        uintptr_t SeatPart; // 0xf0
        char pad_3[0x8];
        uintptr_t MoveToPart; // 0x100
        char pad_4[0x8];
        Vector3 CameraOffset; // 0x110
        char pad_5[0x18];
        Vector3 MoveDirection; // 0x134
        Vector3 TargetPoint; // 0x140
        char pad_6[0xc];
        Vector3 MoveToPoint; // 0x158
        unknown WalkToPoint; // 0x158
        char pad_7[0x10];
        int DisplayDistanceType; // 0x174
        int FloorMaterial; // 0x178
        float HealthDisplayDistance; // 0x17c
        int HealthDisplayType; // 0x180
        float Health; // 0x184
        unknown HipHeight; // 0x188
        char pad_8[0x10];
        float JumpHeight; // 0x198
        float JumpPower; // 0x19c
        float MaxHealth; // 0x1a0
        float MaxSlopeAngle; // 0x1a4
        float NameDisplayDistance; // 0x1a8
        int NameOcclusion; // 0x1ac
        char pad_9[0x8];
        unknown RigType; // 0x1b8
        char pad_10[0x10];
        float Walkspeed; // 0x1c8
        bool AutoJumpEnabled; // 0x1cc
        bool AutoRotate; // 0x1cd
        bool AutomaticScalingEnabled; // 0x1ce
        char pad_11[0x1];
        bool BreakJointsOnDeath; // 0x1d0
        bool EvaluateStateMachine; // 0x1d1
        char pad_12[0x2];
        bool Jump; // 0x1d4
        char pad_13[0x1];
        bool PlatformStand; // 0x1d6
        bool RequiresNeck; // 0x1d7
        bool Sit; // 0x1d8
        char pad_14[0x1];
        bool UseJumpPower; // 0x1da
        char pad_15[0x1c9];
        float WalkspeedCheck; // 0x3a4
        char pad_16[0x48];
        double WalkTimer; // 0x3f0
        char pad_17[0x70];
        uintptr_t HumanoidRootPart; // 0x468
        char pad_18[0x440];
        uintptr_t HumanoidState; // 0x8b0
        uintptr_t PlatformStatePointer; // 0x8b0
        char pad_19[0x186];
        bool IsWalking; // 0xa46
    }; // sizeof = a47

    struct Instance {
        uintptr_t Name; // 0x0
        uintptr_t This; // 0x8
        uintptr_t ChildrenEnd; // 0x8
        string ClassName; // 0x8
        uintptr_t ClassDescriptor; // 0x18
        char pad_0[0x40];
        uintptr_t Parent; // 0x60
        uintptr_t NameContainer; // 0x68
        uintptr_t ChildrenStart; // 0x70
        char pad_1[0x138];
        uintptr_t ClassBase; // 0x1b0
        char pad_2[0x1d27ca8];
        uintptr_t SetParent; // 0x1d27e60
    }; // sizeof = 1d27e68

    struct JointInstance {
        char pad_0[0x100];
        uintptr_t Part0; // 0x100
        char pad_1[0x8];
        uintptr_t Part1; // 0x110
    }; // sizeof = 118

    struct LRUHolder {
        char pad_0[0x20];
        unknown MemEnforcedLRUCache; // 0x20
    }; // sizeof = 20

    struct LRUNode {
        unknown Next; // 0x0
        char pad_0[0x10];
        unknown AssetID; // 0x10
        char pad_1[0x28];
        unknown CachedItem; // 0x38
    }; // sizeof = 38

    struct Lighting {
        char pad_0[0xb0];
        float ClockTime; // 0xb0
        char pad_1[0x4];
        Color3 Ambient; // 0xb8
        char pad_2[0xc];
        Color3 ColorShift_Bottom; // 0xc4
        char pad_3[0xc];
        Color3 ColorShift_Top; // 0xd0
        char pad_4[0xc];
        Color3 FogColor; // 0xdc
        char pad_5[0xc];
        Color3 OutdoorAmbient; // 0xe8
        char pad_6[0x18];
        float Brightness; // 0x100
        float EnvironmentDiffuseScale; // 0x104
        float EnvironmentSpecularScale; // 0x108
        float ExposureCompensation; // 0x10c
        char pad_7[0x4];
        float FogEnd; // 0x114
        float FogStart; // 0x118
        float GeographicLatitude; // 0x11c
        char pad_8[0xc];
        bool GlobalShadows; // 0x12c
        char pad_9[0xb];
        Color3 GradientTop; // 0x138
        char pad_10[0xc];
        Color3 LightColor; // 0x144
        char pad_11[0xc];
        Vector3 LightDirection; // 0x150
        int Source; // 0x15c
        Vector3 SunPosition; // 0x160
        Vector3 MoonPosition; // 0x16c
        Color3 GradientBottom; // 0x178
        char pad_12[0x38];
        uintptr_t Sky; // 0x1b0
    }; // sizeof = 1b8

    struct LocalScript {
        char pad_0[0xb8];
        string GUID; // 0xb8
        char pad_1[0xc0];
        uintptr_t ByteCode; // 0x178
        char pad_2[0x8];
        string Hash; // 0x188
    }; // sizeof = 188

    struct LuaB {
        char pad_0[0x5aa8f00];
        uintptr_t LuaBPrint; // 0x5aa8f00
        char pad_1[0xb8];
        uintptr_t LuaBTonumber; // 0x5aa8fc0
        char pad_2[0x388];
        uintptr_t LuaBError; // 0x5aa9350
        char pad_3[0xf38];
        uintptr_t LuaBGetMetatable; // 0x5aaa290
        char pad_4[0x188];
        uintptr_t LuaBSetMetatable; // 0x5aaa420
        char pad_5[0x9d8];
        uintptr_t LuaBGetFenv; // 0x5aaae00
        char pad_6[0xb8];
        uintptr_t LuaBSetFenv; // 0x5aaaec0
        char pad_7[0x228];
        uintptr_t LuaBRawEqual; // 0x5aab0f0
        char pad_8[0x108];
        uintptr_t LuaBRawGet; // 0x5aab200
        char pad_9[0x968];
        uintptr_t LuaBRawSet; // 0x5aabb70
        char pad_10[0xb68];
        uintptr_t LuaBRawLen; // 0x5aac6e0
        char pad_11[0x98];
        uintptr_t LuaBGcinfo; // 0x5aac780
        char pad_12[0x18];
        uintptr_t LuaBType; // 0x5aac7a0
        char pad_13[0xb58];
        uintptr_t LuaBTypeof; // 0x5aad300
        char pad_14[0xb58];
        uintptr_t LuaBNext; // 0x5aade60
        char pad_15[0xa98];
        uintptr_t LuaBAssert; // 0x5aae900
        char pad_16[0xa8];
        uintptr_t LuaBSelect; // 0x5aae9b0
        char pad_17[0xad8];
        uintptr_t LuaBTostring; // 0x5aaf490
        char pad_18[0x58];
        uintptr_t LuaBNewProxy; // 0x5aaf4f0
    }; // sizeof = 5aaf4f8

    struct LuaCoroutine {
        char pad_0[0x5adbaa0];
        uintptr_t Status; // 0x5adbaa0
        char pad_1[0x24c8];
        uintptr_t Create; // 0x5addf70
        char pad_2[0x598];
        uintptr_t Wrap; // 0x5ade510
        char pad_3[0x2b8];
        uintptr_t Yield; // 0x5ade7d0
        char pad_4[0x58];
        uintptr_t Running; // 0x5ade830
        char pad_5[0x68];
        uintptr_t IsYieldable; // 0x5ade8a0
        char pad_6[0x2808];
        uintptr_t Finally; // 0x5ae10b0
    }; // sizeof = 5ae10b8

    struct LuaState {
        unsigned char Tt; // 0x0
        char pad_0[0x48];
        uintptr_t StackLast; // 0x48
        char pad_1[0x8];
        uintptr_t Stack; // 0x58
        uintptr_t Global; // 0x60
        uintptr_t Base; // 0x68
        uintptr_t Top; // 0x70
        uintptr_t Ci; // 0x78
    }; // sizeof = 80

    struct Luau {
        uintptr_t TString_Tag; // 0x0
        uintptr_t TValue_Value; // 0x0
        uintptr_t Table_Tag; // 0x0
        int TValue_TagNumber; // 0x3
        int TValue_TagString; // 0x5
        bool ClosureIsC; // 0x6
        int TValue_TagTable; // 0x6
        uintptr_t Table_SizeArray; // 0x8
        uintptr_t Table_lsizenode; // 0xc
        uintptr_t TValue_Tag; // 0xc
        uintptr_t TValueSize; // 0x10
        uintptr_t TValue_Size; // 0x10
        uintptr_t TString_Hash; // 0x10
        uintptr_t TString_Length; // 0x14
        uintptr_t TString_Data; // 0x18
        uintptr_t Table_Array; // 0x20
        uintptr_t Table_NodeArray; // 0x28
        uintptr_t StateGlobal; // 0x60
        uintptr_t GlobalMainThread; // 0x60
        uintptr_t StateBase; // 0x68
        uintptr_t StateTop; // 0x70
        uintptr_t StateCI; // 0x78
        char pad_0[0x5aa8e63];
        uintptr_t luaB_print; // 0x5aa8f00
        char pad_1[0xb8];
        uintptr_t luaB_tonumber; // 0x5aa8fc0
        char pad_2[0x388];
        uintptr_t luaB_error; // 0x5aa9350
        char pad_3[0xf38];
        uintptr_t luaB_getmetatable; // 0x5aaa290
        char pad_4[0x188];
        uintptr_t luaB_setmetatable; // 0x5aaa420
        char pad_5[0x9d8];
        uintptr_t luaB_getfenv; // 0x5aaae00
        char pad_6[0xb8];
        uintptr_t luaB_setfenv; // 0x5aaaec0
        char pad_7[0x228];
        uintptr_t luaB_rawequal; // 0x5aab0f0
        char pad_8[0x108];
        uintptr_t luaB_rawget; // 0x5aab200
        char pad_9[0x968];
        uintptr_t luaB_rawset; // 0x5aabb70
        char pad_10[0xb68];
        uintptr_t luaB_rawlen; // 0x5aac6e0
        char pad_11[0x98];
        uintptr_t luaB_gcinfo; // 0x5aac780
        char pad_12[0x18];
        uintptr_t luaB_type; // 0x5aac7a0
        char pad_13[0xb58];
        uintptr_t luaB_typeof; // 0x5aad300
        char pad_14[0xb58];
        uintptr_t luaB_next; // 0x5aade60
        char pad_15[0xa98];
        uintptr_t luaB_assert; // 0x5aae900
        char pad_16[0xa8];
        uintptr_t luaB_select; // 0x5aae9b0
        char pad_17[0xad8];
        uintptr_t luaB_tostring; // 0x5aaf490
        char pad_18[0x58];
        uintptr_t luaB_newproxy; // 0x5aaf4f0
    }; // sizeof = 5aaf4f8

    struct LuauGlobal {
        char pad_0[0x60];
        uintptr_t mainthread; // 0x60
    }; // sizeof = 68

    struct MaterialColors {
        char pad_0[0x6];
        ColorUint_8 Grass; // 0x6
        char pad_1[0x3];
        ColorUint_8 Slate; // 0x9
        char pad_2[0x3];
        ColorUint_8 Concrete; // 0xc
        char pad_3[0x3];
        ColorUint_8 Brick; // 0xf
        char pad_4[0x3];
        ColorUint_8 Sand; // 0x12
        char pad_5[0x3];
        ColorUint_8 WoodPlanks; // 0x15
        char pad_6[0x3];
        ColorUint_8 Rock; // 0x18
        char pad_7[0x3];
        ColorUint_8 Glacier; // 0x1b
        char pad_8[0x3];
        ColorUint_8 Snow; // 0x1e
        char pad_9[0x3];
        ColorUint_8 Sandstone; // 0x21
        char pad_10[0x3];
        ColorUint_8 Mud; // 0x24
        char pad_11[0x3];
        ColorUint_8 Basalt; // 0x27
        char pad_12[0x3];
        ColorUint_8 Ground; // 0x2a
        char pad_13[0x3];
        ColorUint_8 CrackedLava; // 0x2d
        char pad_14[0x3];
        ColorUint_8 Asphalt; // 0x30
        char pad_15[0x3];
        ColorUint_8 Cobblestone; // 0x33
        char pad_16[0x3];
        ColorUint_8 Ice; // 0x36
        char pad_17[0x3];
        ColorUint_8 LeafyGrass; // 0x39
        char pad_18[0x3];
        ColorUint_8 Salt; // 0x3c
        char pad_19[0x3];
        ColorUint_8 Limestone; // 0x3f
        char pad_20[0x3];
        ColorUint_8 Pavement; // 0x42
    }; // sizeof = 42

    struct MaterialLayer {
        char pad_0[0x11];
        BYTE FillModeByte; // 0x11
        char pad_1[0x6];
        int MatFlags; // 0x18
        int Param; // 0x1c
        int Flags2; // 0x20
        int ColorData; // 0x24
        char pad_2[0x60];
        uintptr_t Stride; // 0x88
        uintptr_t Stride; // 0x88
    }; // sizeof = 98

    struct MemEnforcedLRUCache {
        char pad_0[0x8];
        unknown Head; // 0x8
    }; // sizeof = 8

    struct MeshContentProvider {
        char pad_0[0x10];
        uintptr_t AssetID; // 0x10
        char pad_1[0x8];
        uintptr_t LRUCache; // 0x20
        uintptr_t MeshData; // 0x28
        uintptr_t ToMeshData; // 0x28
        char pad_2[0x88];
        unknown LRUHolder; // 0xc0
        uintptr_t Cache; // 0xc0
    }; // sizeof = c8

    struct MeshData {
        uintptr_t VertexStart; // 0x0
        uintptr_t VertexEnd; // 0x8
        char pad_0[0x20];
        uintptr_t FaceStart; // 0x30
        uintptr_t FaceEnd; // 0x38
    }; // sizeof = 40

    struct MeshPart {
        char pad_0[0x210];
        Vector3 MeshSize; // 0x210
        char pad_1[0xdc];
        string MeshId; // 0x2f8
        char pad_2[0x30];
        string Texture; // 0x328
    }; // sizeof = 328

    struct Misc {
        char pad_0[0x10];
        int StringLength; // 0x10
        char pad_1[0x8c];
        string Value; // 0xa0
        char pad_2[0x8];
        string AnimationId; // 0xa8
        char pad_3[0x30];
        uintptr_t Adornee; // 0xd8
    }; // sizeof = e0

    struct Model {
        char pad_0[0x12c];
        float Scale; // 0x12c
        char pad_1[0x110];
        uintptr_t PrimaryPart; // 0x240
    }; // sizeof = 248

    struct ModuleScript {
        char pad_0[0x93];
        bool IsCoreScript; // 0x93
        char pad_1[0x24];
        string GUID; // 0xb8
        char pad_2[0x68];
        uintptr_t ByteCode; // 0x120
        char pad_3[0x220];
        string Hash; // 0x348
    }; // sizeof = 348

    struct MouseService {
        char pad_0[0xbc];
        Vector2 MousePosition; // 0xbc
        char pad_1[0x24];
        uintptr_t InputObject; // 0xe8
        char pad_2[0x8];
        uintptr_t InputObject2; // 0xf8
    }; // sizeof = 100

    struct ParticleEmitter {
        char pad_0[0x1a8];
        string Texture; // 0x1a8
        char pad_1[0x20];
        Vector3 Acceleration; // 0x1c8
        char pad_2[0x8];
        Vector2 Lifetime; // 0x1dc
        float RotSpeed; // 0x1e4
        char pad_3[0x4];
        float Rotation; // 0x1ec
        char pad_4[0x4];
        float Speed; // 0x1f4
        char pad_5[0x4];
        Vector2 SpreadAngle; // 0x1fc
        float Brightness; // 0x204
        float Drag; // 0x208
        char pad_6[0x14];
        float LightEmission; // 0x220
        float LightInfluence; // 0x224
        char pad_7[0x8];
        float Rate; // 0x230
        char pad_8[0x10];
        float TimeScale; // 0x244
        float VelocityInheritance; // 0x248
        float ZOffset; // 0x24c
    }; // sizeof = 250

    struct Player {
        char pad_0[0xb8];
        uintptr_t UserId; // 0xb8
        char pad_1[0x58];
        uintptr_t LocalPlayer; // 0x118
        string DisplayName; // 0x120
        char pad_2[0x180];
        uintptr_t ModelInstance; // 0x2a0
        char pad_3[0x38];
        uintptr_t Team; // 0x2e0
        char pad_4[0x7c];
        int AccountAge; // 0x364
        char pad_5[0x8];
        float MaxZoomDistance; // 0x370
        float MinZoomDistance; // 0x374
        int CameraMode; // 0x378
        char pad_6[0x24];
        float HealthDisplayDistance; // 0x3a0
        char pad_7[0xc];
        float NameDisplayDistance; // 0x3b0
        char pad_8[0x4];
        int TeamColor; // 0x3b8
        char pad_9[0x384];
        unknown LocaleId; // 0x740
        char pad_10[0xab0];
        uintptr_t Mouse; // 0x11f0
    }; // sizeof = 11f8

    struct PlayerMouse {
        char pad_0[0xb0];
        string Icon; // 0xb0
        char pad_1[0x88];
        uintptr_t Workspace; // 0x138
    }; // sizeof = 140

    struct Primitive {
        char pad_0[0x6];
        uintptr_t Validate; // 0x6
        char pad_1[0xa2];
        Matrix3x3 Rotation; // 0xb0
        Vector3 Position; // 0xd4
        Vector3 AssemblyLinearVelocity; // 0xe0
        Vector3 AssemblyAngularVelocity; // 0xec
        char pad_2[0xc6];
        BYTE Flags; // 0x1be
        char pad_3[0x5];
        Vector3 Size; // 0x1c4
        char pad_4[0x40];
        uintptr_t Geometry; // 0x210
        uintptr_t Owner; // 0x218
        char pad_5[0x2e];
        unsigned short Material; // 0x24e
        uint16_t MaterialType; // 0x24e
    }; // sizeof = 24e

    struct PrimitiveFlags {
        char pad_0[0x2];
        unknown Anchored; // 0x2
        char pad_1[0x6];
        unknown CanCollide; // 0x8
        char pad_2[0x8];
        unknown CanTouch; // 0x10
        char pad_3[0x10];
        unknown CanQuery; // 0x20
    }; // sizeof = 20

    struct ProximityPrompt {
        char pad_0[0x98];
        string ActionText; // 0x98
        char pad_1[0x20];
        string ObjectText; // 0xb8
        char pad_2[0x4c];
        int GamepadKeyCode; // 0x104
        float HoldDuration; // 0x108
        int KeyCode; // 0x10c
        float MaxActivationDistance; // 0x110
        char pad_3[0xa];
        bool Enabled; // 0x11e
        bool RequiresLineOfSight; // 0x11f
    }; // sizeof = 120

    struct RakNet {
        char pad_0[0x2889ea0];
        uintptr_t Startup; // 0x2889ea0
        char pad_1[0x2408];
        uintptr_t Connect; // 0x288c2b0
        char pad_2[0x7c8];
        uintptr_t Shutdown; // 0x288ca80
        char pad_3[0x1178];
        uintptr_t Send; // 0x288dc00
        char pad_4[0x6e8];
        uintptr_t Receive; // 0x288e2f0
        char pad_5[0x6f8];
        uintptr_t DeallocatePacket; // 0x288e9f0
        char pad_6[0x4911c40];
        uintptr_t VTableRva; // 0x71a0638
    }; // sizeof = 71a0640

    struct Raycast {
        char pad_0[0xb0];
        uintptr_t RaycastBoundFn; // 0xb0
        char pad_1[0xd34368];
        uintptr_t RaycastBoundFnRva; // 0xd34420
        char pad_2[0x79d6c18];
        uintptr_t RaycastBoundDesc; // 0x870b040
        uintptr_t RaycastDescriptorRva; // 0x870b040
    }; // sizeof = 870b050

    struct RegionNode {
        char pad_0[0x10];
        int Key; // 0x10
        uintptr_t SlotStride; // 0x10
        char pad_1[0x4c];
        uintptr_t Slots; // 0x68
    }; // sizeof = 70

    struct RegionSlot {
        char pad_0[0x8];
        uintptr_t Entry; // 0x8
    }; // sizeof = 10

    struct RemoteEvent {
        char pad_0[0x34df120];
        uintptr_t OnServerEvent; // 0x34df120
        char pad_1[0x48];
        uintptr_t OnClientEvent; // 0x34df170
        char pad_2[0xf08];
        uintptr_t FireServer; // 0x34e0080
        char pad_3[0x5957eb8];
        uintptr_t InstanceArgumentMeta1; // 0x8e37f40
        char pad_4[0xcadf8];
        uintptr_t InstanceArgumentMeta0; // 0x8f02d40
    }; // sizeof = 8f02d48

    struct RemoteFunction {
        char pad_0[0x35b9980];
        uintptr_t InvokeServer; // 0x35b9980
        char pad_1[0x748];
        uintptr_t OnClientInvoke; // 0x35ba0d0
    }; // sizeof = 35ba0d8

    struct RemoteSpy {
        char pad_0[0x71fc8f0];
        unsigned int RemoteEventVTableRva; // 0x71fc8f0
    }; // sizeof = 71fc8f0

    struct RenderJob {
        char pad_0[0x38];
        uintptr_t FakeDataModel; // 0x38
        char pad_1[0x1a0];
        uintptr_t RenderView; // 0x1e0
        char pad_2[0x8];
        uintptr_t RealDataModel; // 0x1f0
    }; // sizeof = 1f8

    struct RenderView {
        char pad_0[0x10];
        uintptr_t DeviceD3D11; // 0x10
        char pad_1[0x8];
        uintptr_t VisualEngine; // 0x20
    }; // sizeof = 28

    struct RunService {
        char pad_0[0xc8];
        double HeartbeatFPS; // 0xc8
        char pad_1[0x8];
        uintptr_t HeartbeatTask; // 0xd8
    }; // sizeof = e0

    struct Script {
        char pad_0[0xb8];
        string GUID; // 0xb8
        char pad_1[0xc0];
        uintptr_t ByteCode; // 0x178
        char pad_2[0x8];
        string Hash; // 0x188
    }; // sizeof = 188

    struct ScriptContext {
        char pad_0[0x7269f98];
        uintptr_t VTable; // 0x7269f98
    }; // sizeof = 7269fa0

    struct Seat {
        char pad_0[0x200];
        uintptr_t Occupant; // 0x200
    }; // sizeof = 208

    struct Signals {
        char pad_0[0x3cca190];
        uintptr_t IsLegalSendEvent; // 0x3cca190
    }; // sizeof = 3cca198

    struct Sky {
        char pad_0[0xb0];
        string MoonTextureId; // 0xb0
        char pad_1[0x30];
        string SkyboxBk; // 0xe0
        char pad_2[0x30];
        string SkyboxDn; // 0x110
        char pad_3[0x30];
        string SkyboxFt; // 0x140
        char pad_4[0x30];
        string SkyboxLf; // 0x170
        char pad_5[0x30];
        string SkyboxRt; // 0x1a0
        char pad_6[0x30];
        string SkyboxUp; // 0x1d0
        char pad_7[0x30];
        string SunTextureId; // 0x200
        char pad_8[0x20];
        Vector3 SkyboxOrientation; // 0x220
        float MoonAngularSize; // 0x22c
        int StarCount; // 0x230
        float SunAngularSize; // 0x234
        char pad_9[0x37f6c87];
        uintptr_t DrawCubeCallB; // 0x37f6ebf
        char pad_10[0x1358fd];
        uintptr_t DrawAdv; // 0x392c7c4
    }; // sizeof = 392c7cc

    struct SmoothClusterGeometry {
        char pad_0[0x48];
        uintptr_t GridOld; // 0x48
        char pad_1[0x58];
        uintptr_t Regions; // 0xa8
        uintptr_t RegionCount; // 0xb0
    }; // sizeof = b8

    struct Sound {
        char pad_0[0xb0];
        string SoundId; // 0xb0
        char pad_1[0x20];
        uintptr_t SoundGroup; // 0xd0
        char pad_2[0x34];
        float PlaybackSpeed; // 0x10c
        float RollOffMaxDistance; // 0x110
        float RollOffMinDistance; // 0x114
        char pad_3[0x8];
        float Volume; // 0x120
        char pad_4[0x9];
        bool Looped; // 0x12d
        char pad_5[0x2];
        bool IsPlaying; // 0x130
    }; // sizeof = 131

    struct SpawnLocation {
        char pad_0[0x1d0];
        int ForcefieldDuration; // 0x1d0
        int TeamColor; // 0x1d4
        bool AllowTeamChangeOnTouch; // 0x1d8
        bool Enabled; // 0x1d9
        bool Neutral; // 0x1da
    }; // sizeof = 1db

    struct SpecialMesh {
        char pad_0[0xa0];
        unknown Offset; // 0xa0
        char pad_1[0xc];
        Vector3 Scale; // 0xac
        char pad_2[0x28];
        string MeshId; // 0xe0
    }; // sizeof = e0

    struct SunRaysEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        float Intensity; // 0xa0
        float Spread; // 0xa4
    }; // sizeof = a8

    struct SurfaceAppearance {
        char pad_0[0xb0];
        string ColorMap; // 0xb0
        char pad_1[0x30];
        string EmissiveMaskContent; // 0xe0
        char pad_2[0x30];
        string MetalnessMap; // 0x110
        char pad_3[0x30];
        string NormalMap; // 0x140
        char pad_4[0x30];
        string RoughnessMap; // 0x170
        char pad_5[0x50];
        Color3 Color; // 0x1c0
        char pad_6[0xc];
        Color3 EmissiveTint; // 0x1cc
        char pad_7[0xc];
        int AlphaMode; // 0x1d8
        float EmissiveStrength; // 0x1dc
    }; // sizeof = 1e0

    struct TaskScheduler {
        char pad_0[0x18];
        string JobName; // 0x18
        char pad_1[0x98];
        double MaxFPS; // 0xb0
        char pad_2[0x10];
        uintptr_t JobStart; // 0xc8
        uintptr_t JobEnd; // 0xd0
        char pad_3[0x8f1e330];
        uintptr_t Pointer; // 0x8f1e408
    }; // sizeof = 8f1e410

    struct Team {
        char pad_0[0xa0];
        int BrickColor; // 0xa0
    }; // sizeof = a4

    struct TechniqueArray {
        uintptr_t BeginOffset; // 0x0
        uintptr_t EndOffset; // 0x8
        char pad_0[0x78];
        uintptr_t EntryStride; // 0x88
    }; // sizeof = 90

    struct Terrain {
        char pad_0[0x1c8];
        Color3 WaterColor; // 0x1c8
        char pad_1[0x10];
        float GrassLength; // 0x1d8
        char pad_2[0x4];
        float WaterReflectance; // 0x1e0
        float WaterTransparency; // 0x1e4
        float WaterWaveSize; // 0x1e8
        float WaterWaveSpeed; // 0x1ec
        char pad_3[0x2b0];
        uintptr_t MaterialColors; // 0x4a0
    }; // sizeof = 4a8

    struct TerrainGrid {
        uintptr_t NodeNext; // 0x0
        char pad_0[0x8];
        int NodeKey; // 0x10
        char pad_1[0xc];
        uintptr_t NodeRowIndices; // 0x20
        uintptr_t NodeRows; // 0x28
        uintptr_t MapHead; // 0x30
        int NodeStride; // 0x30
        uintptr_t MapSize; // 0x38
        char pad_2[0x48];
        int NodeOctMask; // 0x8c
        char pad_3[0x1a8];
        uintptr_t Grid; // 0x238
        char pad_4[0x8ae3d30];
        uintptr_t SharedRowsRva; // 0x8ae3f70
    }; // sizeof = 8ae3f78

    struct TextButton {
        char pad_0[0x6ae];
        unknown Selected; // 0x6ae
        char pad_1[0x6b2];
        Color3 TextColor3; // 0xd60
        char pad_2[0x2c];
        float TextTransparency; // 0xd8c
    }; // sizeof = d90

    struct TextLabel {
        char pad_0[0xae0];
        Color3 TextColor3; // 0xae0
        char pad_1[0x2c];
        float TextTransparency; // 0xb0c
        unknown TextTruncate; // 0xb10
        char pad_2[0x4];
        unknown TextXAlignment; // 0xb14
    }; // sizeof = b14

    struct Textures {
        char pad_0[0x1c8];
        string Decal_Texture; // 0x1c8
        string Texture_Texture; // 0x1c8
    }; // sizeof = 1c8

    struct Tool {
        char pad_0[0x348];
        string TextureId; // 0x348
        char pad_1[0x108];
        string Tooltip; // 0x450
        char pad_2[0x44];
        Vector3 Grip; // 0x494
        bool CanBeDropped; // 0x4a0
        bool Enabled; // 0x4a1
        bool ManualActivationOnly; // 0x4a2
        bool RequiresHandle; // 0x4a3
        char pad_3[0x30b23ac];
        uintptr_t Activate; // 0x30b2850
        char pad_4[0xa8];
        uintptr_t Deactivate; // 0x30b2900
    }; // sizeof = 30b2908

    struct TriangleMesh {
        char pad_0[0x20];
        uintptr_t Data; // 0x20
    }; // sizeof = 28

    struct TriangleMeshData {
        uintptr_t CompoundShape; // 0x0
    }; // sizeof = 8

    struct UnionOperation {
        char pad_0[0x2f8];
        string AssetId; // 0x2f8
    }; // sizeof = 2f8

    struct UserInputService {
        char pad_0[0x288];
        uintptr_t WindowInputState; // 0x288
    }; // sizeof = 290

    struct VehicleSeat {
        char pad_0[0x210];
        float MaxSpeed; // 0x210
        float SteerFloat; // 0x214
        float ThrottleFloat; // 0x218
        float Torque; // 0x21c
        float TurnSpeed; // 0x220
    }; // sizeof = 224

    struct VisualEngine {
        uintptr_t TechniqueVec; // 0x0
        char pad_0[0x20];
        uintptr_t ShaderProgram; // 0x28
        char pad_1[0x50];
        uintptr_t ShaderList; // 0x80
        char pad_2[0x128];
        ViewMatrix_t ViewMatrix; // 0x1b0
        char pad_3[0x5d0];
        uintptr_t EntityManager; // 0x7c0
        char pad_4[0x328];
        uintptr_t FakeDataModel; // 0xaf0
        char pad_5[0x18];
        Vector2 Dimensions; // 0xb10
        char pad_6[0x28];
        uintptr_t SceneUpdater; // 0xb40
        char pad_7[0x70];
        uintptr_t ShaderManager; // 0xbb8
        char pad_8[0x90];
        unknown RenderView; // 0xc50
        char pad_9[0x8a10bb8];
        uintptr_t Pointer; // 0x8a11808
    }; // sizeof = 8a11810

    struct WeldConstraint {
        char pad_0[0xa0];
        uintptr_t Part0; // 0xa0
        char pad_1[0x8];
        uintptr_t Part1; // 0xb0
    }; // sizeof = b8

    struct WindowInputState {
        char pad_0[0x40];
        bool CapsLock; // 0x40
        char pad_1[0x7];
        uintptr_t CurrentTextBox; // 0x48
    }; // sizeof = 50

    struct Workspace {
        char pad_0[0x3f8];
        uintptr_t World; // 0x3f8
        char pad_1[0xa0];
        uintptr_t CurrentCamera; // 0x4a0
        char pad_2[0x18];
        double DistributedGameTime; // 0x4c0
        char pad_3[0x500];
        float ReadOnlyGravity; // 0x9c8
    }; // sizeof = 9cc

    struct World {
        char pad_0[0x20c];
        float FallenPartsDestroyHeight; // 0x20c
        char pad_1[0x8];
        float Gravity; // 0x218
        char pad_2[0x14];
        uintptr_t AirProperties; // 0x230
        char pad_3[0x68];
        unknown Primitives; // 0x2a0
        char pad_4[0x5c8];
        float worldStepsPerSec; // 0x868
    }; // sizeof = 86c

    struct btConvexHullShape {
        char pad_0[0x20];
        unsigned int PointCount; // 0x20
        char pad_1[0x8];
        uintptr_t Points; // 0x28
    }; // sizeof = 30

    struct btGImpactCompoundShape {
        char pad_0[0x30];
        uintptr_t HullsBegin; // 0x30
        uintptr_t HullsEnd; // 0x38
        char pad_1[0x40];
        uintptr_t HullStride; // 0x80
    }; // sizeof = 88

    struct global_State {
        char pad_0[0x60];
        uintptr_t mainthread; // 0x60
    }; // sizeof = 68

    struct lua_State {
        unsigned char Tt; // 0x0
        char pad_0[0x48];
        uintptr_t StackLast; // 0x48
        char pad_1[0x8];
        uintptr_t Stack; // 0x58
        uintptr_t Global; // 0x60
        uintptr_t Base; // 0x68
        uintptr_t Top; // 0x70
        uintptr_t Ci; // 0x78
    }; // sizeof = 80

}
