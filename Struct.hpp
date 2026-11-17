#pragma once
/* =============================================================
/*                       servyy's offsets                         
/* -------------------------------------------------------------
/*  Dumped by       : servyy <3                                 
/*  Roblox Version  : version-2c6fd5e09aaf4cfa
/*  Dumper Version  : 2.2.6
/*  Dumped At       : 19:28 17/11/2026 (GMT)
/*  Total Offsets   : 659
/* -------------------------------------------------------------
/*  by servyy <3                                                
/* =============================================================
*/

#include <cstdint>
#include <string>
namespace Structs {
    inline std::string ClientVersion = "version-2c6fd5e09aaf4cfa";

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
        char pad_4[0x940];
        bool IsPlaying; // 0xa40
    }; // sizeof = a41

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
        unknown FileMeshData; // 0x0
    }; // sizeof = 0

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

    struct Clothing {
        char pad_0[0xe8];
        string Template; // 0xe8
        char pad_1[0x20];
        Color3 Color3; // 0x108
    }; // sizeof = 108

    struct ColorCorrectionEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x37];
        Color3 TintColor; // 0xd0
        char pad_2[0xc];
        float Brightness; // 0xdc
        char pad_3[0x4];
        float Contrast; // 0xe4
    }; // sizeof = e8

    struct ColorGradingEffect {
        char pad_0[0x98];
        bool Enabled; // 0x98
        char pad_1[0x7];
        int TonemapperPreset; // 0xa0
    }; // sizeof = a4

    struct Coroutine {
        char pad_0[0x58f5860];
        uintptr_t Status; // 0x58f5860
        char pad_1[0x2558];
        uintptr_t Create; // 0x58f7dc0
        char pad_2[0x5b8];
        uintptr_t Wrap; // 0x58f8380
        char pad_3[0x2c8];
        uintptr_t Yield; // 0x58f8650
        char pad_4[0x58];
        uintptr_t Running; // 0x58f86b0
        char pad_5[0x78];
        uintptr_t IsYieldable; // 0x58f8730
        char pad_6[0x2928];
        uintptr_t Finally; // 0x58fb060
    }; // sizeof = 58fb068

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
        char pad_5[0x14];
        int PlaceVersion; // 0x1bc
        char pad_6[0x18];
        uintptr_t ToRenderView1; // 0x1d8
        char pad_7[0x250];
        int PrimitiveCount; // 0x430
        char pad_8[0xc];
        uintptr_t ScriptContext; // 0x440
        char pad_9[0x158];
        string ServerIP; // 0x5a0
        char pad_10[0x18];
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

    struct Descriptor {
        char pad_0[0x8];
        unknown Name; // 0x8
        char pad_1[0xa8];
        unknown Invoke; // 0xb0
    }; // sizeof = b0

    struct DeviceD3D11 {
        char pad_0[0x88];
        uintptr_t SwapChainPtr; // 0x88
        char pad_1[0xf0];
        uintptr_t DevicePtr; // 0x180
        uintptr_t ContextPtr; // 0x188
        uintptr_t Context; // 0x188
        char pad_2[0x20];
        uintptr_t ContextObj; // 0x1b8
        char pad_3[0x704de88];
        uintptr_t VTableRva; // 0x704e048
    }; // sizeof = 704e050

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
        char pad_2[0x84e2bc0];
        uintptr_t Pointer; // 0x84e2bf8
    }; // sizeof = 84e2c00

    struct FakeDataModel {
        char pad_0[0x1f8];
        uintptr_t RealDataModel; // 0x1f8
        char pad_1[0x8e16168];
        uintptr_t Pointer; // 0x8e16368
    }; // sizeof = 8e16370

    struct FastCluster {
        char pad_0[0x48];
        uintptr_t EntityBegin; // 0x48
        uintptr_t EntityEnd; // 0x50
        char pad_1[0x38];
        int BindingSubobject; // 0x90
        char pad_2[0x70b2bcc];
        uintptr_t VTableRvaSub; // 0x70b2c60
        char pad_3[0x130];
        uintptr_t VTableRva; // 0x70b2d98
    }; // sizeof = 70b2da0

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
        char pad_5[0x70b4218];
        uintptr_t VTableRva; // 0x70b42e0
        char pad_6[0x40];
        uintptr_t MeshVTableRva; // 0x70b4328
    }; // sizeof = 70b4330

    struct FastClusterMeshGenerator {
        char pad_0[0x70b4328];
        uintptr_t VTableRva; // 0x70b4328
    }; // sizeof = 70b4330

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
        char pad_0[0x41d82a0];
        uintptr_t GlobalCollectGarbage; // 0x41d82a0
        char pad_1[0x908];
        uintptr_t GlobalDelay; // 0x41d8bb0
        char pad_2[0x798];
        uintptr_t GlobalElapsedTime; // 0x41d9350
        char pad_3[0x88];
        uintptr_t GlobalLoadstring; // 0x41d93e0
        char pad_4[0x6c8];
        uintptr_t GlobalPluginManager; // 0x41d9ab0
        char pad_5[0x558];
        uintptr_t GlobalPrint; // 0x41da010
        char pad_6[0x18];
        uintptr_t GlobalPrintIdentity; // 0x41da030
        char pad_7[0xf8];
        uintptr_t GlobalRequire; // 0x41da130
        char pad_8[0x5d8];
        uintptr_t GlobalSettings; // 0x41da710
        char pad_9[0x508];
        uintptr_t GlobalSpawn; // 0x41dac20
        char pad_10[0x778];
        uintptr_t GlobalStats; // 0x41db3a0
        char pad_11[0x5b8];
        uintptr_t GlobalTick; // 0x41db960
        char pad_12[0x78];
        uintptr_t GlobalTime; // 0x41db9e0
        char pad_13[0x208];
        uintptr_t GlobalUserSettings; // 0x41dbbf0
        char pad_14[0x488];
        uintptr_t GlobalVersion; // 0x41dc080
        char pad_15[0xe8];
        uintptr_t GlobalWait; // 0x41dc170
        char pad_16[0x1e8];
        uintptr_t GlobalWarn; // 0x41dc360
        char pad_17[0x838];
        uintptr_t GlobalGetFenv; // 0x41dcba0
        char pad_18[0x148];
        uintptr_t GlobalSetFenv; // 0x41dccf0
    }; // sizeof = 41dccf8

    struct GeometryD3D11 {
        char pad_0[0x704e800];
        uintptr_t VTableRva; // 0x704e800
    }; // sizeof = 704e808

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
        char pad_1[0x18c];
        bool ScreenGui_Enabled; // 0x260
        char pad_2[0x47];
        UDim2 Position; // 0x2a8
        char pad_3[0x10];
        UDim2 Size; // 0x2c8
        Color3 BackgroundColor3; // 0x2d8
        char pad_4[0xc];
        Color3 BorderColor3; // 0x2e4
        char pad_5[0xc];
        Vector2 AnchorPoint; // 0x2f0
        int AutomaticSize; // 0x2f8
        float BackgroundTransparency; // 0x2fc
        int BorderMode; // 0x300
        int BorderSizePixel; // 0x304
        char pad_6[0x8];
        unknown GuiState; // 0x310
        char pad_7[0x4];
        int LayoutOrder; // 0x314
        char pad_8[0x18];
        int SelectionOrder; // 0x330
        char pad_9[0x4];
        unknown SizeConstraint; // 0x338
        char pad_10[0x4];
        int ZIndex; // 0x33c
        bool Active; // 0x340
        bool ClipsDescendants; // 0x341
        char pad_11[0x1];
        bool Interactable; // 0x343
        bool Selectable; // 0x344
        bool Selectable; // 0x344
        bool Visible; // 0x345
        char pad_12[0x329];
        string Image; // 0x670
        char pad_13[0x154];
        unknown ImageRectOffset; // 0x7c4
        char pad_14[0x4];
        string RichText; // 0x7c8
        char pad_15[0x268];
        string Text; // 0xa30
        char pad_16[0xb0];
        Color3 TextColor3; // 0xae0
    }; // sizeof = ae0

    struct HandleAdornment {
        char pad_0[0x100];
        CFrame CFrame; // 0x100
    }; // sizeof = 100

    struct Highlight {
        char pad_0[0xa0];
        uintptr_t Adornee; // 0xa0
        char pad_1[0x8];
        Color3 FillColor; // 0xb0
        char pad_2[0xc];
        Color3 OutlineColor; // 0xbc
        char pad_3[0xc];
        unknown DepthMode; // 0xc8
        char pad_4[0x4];
        float FillTransparency; // 0xcc
        char pad_5[0x4];
        float OutlineTransparency; // 0xd4
        char pad_6[0x4];
        unknown Enabled; // 0xdc
    }; // sizeof = dc

    struct Humanoid {
        char pad_0[0xb];
        Vector3 TargetPoint; // 0xb
        char pad_1[0x9];
        int HumanoidStateID; // 0x20
        char pad_2[0x7c];
        string DisplayName; // 0xa0
        char pad_3[0x50];
        uintptr_t SeatPart; // 0xf0
        char pad_4[0x8];
        uintptr_t MoveToPart; // 0x100
        char pad_5[0x8];
        Vector3 CameraOffset; // 0x110
        char pad_6[0x18];
        Vector3 MoveDirection; // 0x134
        char pad_7[0x18];
        Vector3 MoveToPoint; // 0x158
        unknown WalkToPoint; // 0x158
        char pad_8[0x10];
        int DisplayDistanceType; // 0x174
        int FloorMaterial; // 0x178
        float HealthDisplayDistance; // 0x17c
        int HealthDisplayType; // 0x180
        float Health; // 0x184
        unknown HipHeight; // 0x188
        char pad_9[0x10];
        float JumpHeight; // 0x198
        float JumpPower; // 0x19c
        float MaxHealth; // 0x1a0
        float MaxSlopeAngle; // 0x1a4
        float NameDisplayDistance; // 0x1a8
        int NameOcclusion; // 0x1ac
        char pad_10[0x8];
        unknown RigType; // 0x1b8
        char pad_11[0x10];
        float Walkspeed; // 0x1c8
        bool AutoJumpEnabled; // 0x1cc
        bool AutoRotate; // 0x1cd
        bool AutomaticScalingEnabled; // 0x1ce
        char pad_12[0x1];
        bool BreakJointsOnDeath; // 0x1d0
        bool EvaluateStateMachine; // 0x1d1
        char pad_13[0x2];
        bool Jump; // 0x1d4
        bool PlatformStand; // 0x1d5
        bool RequiresNeck; // 0x1d6
        bool Sit; // 0x1d7
        char pad_14[0x1];
        bool UseJumpPower; // 0x1d9
        char pad_15[0x1c2];
        float WalkspeedCheck; // 0x39c
        char pad_16[0xc0];
        uintptr_t HumanoidRootPart; // 0x460
        char pad_17[0x440];
        uintptr_t HumanoidState; // 0x8a8
        uintptr_t PlatformStatePointer; // 0x8a8
        char pad_18[0x186];
        bool IsWalking; // 0xa3e
    }; // sizeof = a3f

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
        char pad_1[0x140];
        uintptr_t ClassBase; // 0x1b8
        char pad_2[0x1c3ea80];
        uintptr_t SetParent; // 0x1c3ec40
        char pad_3[0x7e68];
        uintptr_t GetAttribute; // 0x1c46ab0
    }; // sizeof = 1c46ab8

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
        char pad_1[0x30];
        unknown CachedItem; // 0x40
    }; // sizeof = 40

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
        char pad_8[0x8];
        float ShadowSoftness; // 0x128
        char pad_9[0x6];
        bool GlobalShadows; // 0x132
        char pad_10[0xd];
        Color3 GradientTop; // 0x140
        char pad_11[0xc];
        Color3 LightColor; // 0x14c
        char pad_12[0xc];
        Vector3 LightDirection; // 0x158
        int Source; // 0x164
        Vector3 SunPosition; // 0x168
        Vector3 MoonPosition; // 0x174
        Color3 GradientBottom; // 0x180
        char pad_13[0x38];
        uintptr_t Sky; // 0x1b8
    }; // sizeof = 1c0

    struct LocalScript {
        char pad_0[0xb8];
        string GUID; // 0xb8
        char pad_1[0xc0];
        uintptr_t ByteCode; // 0x178
        char pad_2[0x8];
        string Hash; // 0x188
    }; // sizeof = 188

    struct LuaB {
        char pad_0[0x58c2af0];
        uintptr_t LuaBPrint; // 0x58c2af0
        char pad_1[0xb8];
        uintptr_t LuaBTonumber; // 0x58c2bb0
        char pad_2[0x398];
        uintptr_t LuaBError; // 0x58c2f50
        char pad_3[0xf48];
        uintptr_t LuaBGetMetatable; // 0x58c3ea0
        char pad_4[0x198];
        uintptr_t LuaBSetMetatable; // 0x58c4040
        char pad_5[0xa38];
        uintptr_t LuaBGetFenv; // 0x58c4a80
        char pad_6[0xc8];
        uintptr_t LuaBSetFenv; // 0x58c4b50
        char pad_7[0x238];
        uintptr_t LuaBRawEqual; // 0x58c4d90
        char pad_8[0x118];
        uintptr_t LuaBRawGet; // 0x58c4eb0
        char pad_9[0x588];
        uintptr_t LuaBRawSet; // 0x58c5440
        char pad_10[0x7a8];
        uintptr_t LuaBRawLen; // 0x58c5bf0
        char pad_11[0x98];
        uintptr_t LuaBGcinfo; // 0x58c5c90
        char pad_12[0x18];
        uintptr_t LuaBType; // 0x58c5cb0
        char pad_13[0xb68];
        uintptr_t LuaBTypeof; // 0x58c6820
        char pad_14[0xb58];
        uintptr_t LuaBNext; // 0x58c7380
        char pad_15[0xaf8];
        uintptr_t LuaBAssert; // 0x58c7e80
        char pad_16[0xa8];
        uintptr_t LuaBSelect; // 0x58c7f30
        char pad_17[0xb38];
        uintptr_t LuaBTostring; // 0x58c8a70
        char pad_18[0x58];
        uintptr_t LuaBNewProxy; // 0x58c8ad0
    }; // sizeof = 58c8ad8

    struct LuaCoroutine {
        char pad_0[0x58f5860];
        uintptr_t Status; // 0x58f5860
        char pad_1[0x2558];
        uintptr_t Create; // 0x58f7dc0
        char pad_2[0x5b8];
        uintptr_t Wrap; // 0x58f8380
        char pad_3[0x2c8];
        uintptr_t Yield; // 0x58f8650
        char pad_4[0x58];
        uintptr_t Running; // 0x58f86b0
        char pad_5[0x78];
        uintptr_t IsYieldable; // 0x58f8730
        char pad_6[0x2928];
        uintptr_t Finally; // 0x58fb060
    }; // sizeof = 58fb068

    struct Luau {
        char pad_0[0x58c2af0];
        uintptr_t luaB_print; // 0x58c2af0
        char pad_1[0xb8];
        uintptr_t luaB_tonumber; // 0x58c2bb0
        char pad_2[0x398];
        uintptr_t luaB_error; // 0x58c2f50
        char pad_3[0xf48];
        uintptr_t luaB_getmetatable; // 0x58c3ea0
        char pad_4[0x198];
        uintptr_t luaB_setmetatable; // 0x58c4040
        char pad_5[0xa38];
        uintptr_t luaB_getfenv; // 0x58c4a80
        char pad_6[0xc8];
        uintptr_t luaB_setfenv; // 0x58c4b50
        char pad_7[0x238];
        uintptr_t luaB_rawequal; // 0x58c4d90
        char pad_8[0x118];
        uintptr_t luaB_rawget; // 0x58c4eb0
        char pad_9[0x588];
        uintptr_t luaB_rawset; // 0x58c5440
        char pad_10[0x7a8];
        uintptr_t luaB_rawlen; // 0x58c5bf0
        char pad_11[0x98];
        uintptr_t luaB_gcinfo; // 0x58c5c90
        char pad_12[0x18];
        uintptr_t luaB_type; // 0x58c5cb0
        char pad_13[0xb68];
        uintptr_t luaB_typeof; // 0x58c6820
        char pad_14[0xb58];
        uintptr_t luaB_next; // 0x58c7380
        char pad_15[0xaf8];
        uintptr_t luaB_assert; // 0x58c7e80
        char pad_16[0xa8];
        uintptr_t luaB_select; // 0x58c7f30
        char pad_17[0xb38];
        uintptr_t luaB_tostring; // 0x58c8a70
        char pad_18[0x58];
        uintptr_t luaB_newproxy; // 0x58c8ad0
    }; // sizeof = 58c8ad8

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
        uintptr_t MeshData; // 0x0
        uintptr_t ToMeshData; // 0x0
        uintptr_t AssetID; // 0x10
        char pad_0[0x8];
        uintptr_t LRUCache; // 0x20
        char pad_1[0x98];
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
    }; // sizeof = 128

    struct MouseService {
        char pad_0[0xbc];
        Vector2 MousePosition; // 0xbc
        char pad_1[0x24];
        uintptr_t InputObject; // 0xe8
        char pad_2[0x8];
        uintptr_t InputObject2; // 0xf8
        char pad_3[0x114];
        float Sensitivity; // 0x214
    }; // sizeof = 218

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
        string LocaleId; // 0x740
        char pad_10[0xb38];
        uintptr_t Mouse; // 0x1278
    }; // sizeof = 1280

    struct PlayerConfigurer {
        char pad_0[0x8cdead8];
        uintptr_t Pointer; // 0x8cdead8
    }; // sizeof = 8cdeae0

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
        char pad_5[0x8];
        uintptr_t Owner; // 0x220
        char pad_6[0x2e];
        unsigned short Material; // 0x256
        uint16_t MaterialType; // 0x256
    }; // sizeof = 256

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
        char pad_4[0x2fc41a0];
        uintptr_t InputHoldBegin; // 0x2fc42c0
        char pad_5[0xd8];
        uintptr_t InputHoldEnd; // 0x2fc43a0
    }; // sizeof = 2fc43a8

    struct RakNet {
        char pad_0[0x275b950];
        uintptr_t Startup; // 0x275b950
        char pad_1[0x23f8];
        uintptr_t Connect; // 0x275dd50
        char pad_2[0x7c8];
        uintptr_t Shutdown; // 0x275e520
        char pad_3[0x1178];
        uintptr_t Send; // 0x275f6a0
        char pad_4[0x6e8];
        uintptr_t Receive; // 0x275fd90
        char pad_5[0x6f8];
        uintptr_t DeallocatePacket; // 0x2760490
        char pad_6[0x48ee9c8];
        uintptr_t VTableRva; // 0x704ee60
    }; // sizeof = 704ee68

    struct Raycast {
        char pad_0[0xb0];
        uintptr_t RaycastBoundFn; // 0xb0
        char pad_1[0xca0e38];
        uintptr_t RaycastBoundFnRva; // 0xca0ef0
        char pad_2[0x78eece8];
        uintptr_t RaycastBoundDesc; // 0x858fbe0
        uintptr_t RaycastDescriptorRva; // 0x858fbe0
    }; // sizeof = 858fbf0

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
        char pad_0[0x3364110];
        uintptr_t OnServerEvent; // 0x3364110
        char pad_1[0x48];
        uintptr_t OnClientEvent; // 0x3364160
        char pad_2[0xf08];
        uintptr_t FireServer; // 0x3365070
        char pad_3[0x5959088];
        uintptr_t InstanceArgumentMeta1; // 0x8cbe100
        char pad_4[0xcc528];
        uintptr_t InstanceArgumentMeta0; // 0x8d8a630
    }; // sizeof = 8d8a638

    struct RemoteFunction {
        char pad_0[0x343a3d0];
        uintptr_t InvokeServer; // 0x343a3d0
        char pad_1[0x768];
        uintptr_t OnClientInvoke; // 0x343ab40
    }; // sizeof = 343ab48

    struct RemoteSpy {
        char pad_0[0x70ab2d8];
        unsigned int RemoteEventVTableRva; // 0x70ab2d8
    }; // sizeof = 70ab2d8

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

    struct Seat {
        char pad_0[0x200];
        uintptr_t Occupant; // 0x200
    }; // sizeof = 208

    struct Signals {
        char pad_0[0x3b3cac0];
        uintptr_t FireMouseClick; // 0x3b3cac0
        char pad_1[0x198];
        uintptr_t FireRightMouseClick; // 0x3b3cc60
        char pad_2[0x13c8];
        uintptr_t FireMouseHoverEnter; // 0x3b3e030
        char pad_3[0x198];
        uintptr_t FireMouseHoverLeave; // 0x3b3e1d0
        char pad_4[0x3a8];
        uintptr_t IsLegalSendEvent; // 0x3b3e580
    }; // sizeof = 3b3e588

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
        char pad_9[0x37dea7c];
        uintptr_t DrawAdv; // 0x37decb4
    }; // sizeof = 37decbc

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
        char pad_2[0x24];
        float PlaybackSpeed; // 0xfc
        float RollOffMaxDistance; // 0x100
        float RollOffMinDistance; // 0x104
        char pad_3[0x8];
        float Volume; // 0x110
        char pad_4[0x1];
        bool Looped; // 0x115
        char pad_5[0x2];
        bool IsPlaying; // 0x118
    }; // sizeof = 119

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
        char pad_3[0x8da5cc0];
        uintptr_t Pointer; // 0x8da5d98
    }; // sizeof = 8da5da0

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
        char pad_4[0x89693e0];
        uintptr_t SharedRowsRva; // 0x8969620
    }; // sizeof = 8969628

    struct TextButton {
        char pad_0[0x6ac];
        bool AutoButtonColor; // 0x6ac
        bool Modal; // 0x6ad
        unknown Selected; // 0x6ae
        char pad_1[0x602];
        unknown ContentText; // 0xcb0
        char pad_2[0x60];
        unknown LocalizedText; // 0xd10
        char pad_3[0x20];
        unknown Text; // 0xd30
        char pad_4[0x30];
        Color3 TextColor3; // 0xd60
        char pad_5[0xc];
        Color3 TextStrokeColor3; // 0xd6c
        char pad_6[0xc];
        float LineHeight; // 0xd78
        int MaxVisibleGraphemes; // 0xd7c
        unknown TextDirection; // 0xd80
        char pad_7[0x4];
        unknown TextSize; // 0xd84
        char pad_8[0x4];
        float TextStrokeTransparency; // 0xd88
        float TextTransparency; // 0xd8c
        unknown TextTruncate; // 0xd90
        char pad_9[0x4];
        unknown TextXAlignment; // 0xd94
        char pad_10[0x4];
        unknown TextYAlignment; // 0xd98
        char pad_11[0x5];
        unknown RichText; // 0xd9d
        char pad_12[0x2];
        unknown TextScaled; // 0xd9f
        char pad_13[0x1];
        unknown TextWrapped; // 0xda0
    }; // sizeof = da0

    struct TextLabel {
        char pad_0[0xa30];
        unknown ContentText; // 0xa30
        char pad_1[0x60];
        unknown LocalizedText; // 0xa90
        char pad_2[0x20];
        unknown Text; // 0xab0
        char pad_3[0x30];
        Color3 TextColor3; // 0xae0
        char pad_4[0xc];
        Color3 TextStrokeColor3; // 0xaec
        char pad_5[0xc];
        float LineHeight; // 0xaf8
        unknown MaxVisibleGraphemes; // 0xafc
        char pad_6[0x4];
        int TextDirection; // 0xb00
        unknown TextSize; // 0xb04
        char pad_7[0x4];
        float TextStrokeTransparency; // 0xb08
        float TextTransparency; // 0xb0c
        unknown TextTruncate; // 0xb10
        char pad_8[0x4];
        unknown TextXAlignment; // 0xb14
        char pad_9[0x9];
        bool RichText; // 0xb1d
        char pad_10[0x1];
        bool TextScaled; // 0xb1f
        unknown TextWrapped; // 0xb20
    }; // sizeof = b20

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
        char pad_3[0x2f490fc];
        uintptr_t Activate; // 0x2f495a0
        char pad_4[0xa8];
        uintptr_t Deactivate; // 0x2f49650
    }; // sizeof = 2f49658

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
        char pad_9[0x8895f48];
        uintptr_t Pointer; // 0x8896b98
    }; // sizeof = 8896ba0

    struct Weld {
        char pad_0[0x100];
        uintptr_t Part0; // 0x100
        char pad_1[0x8];
        uintptr_t Part1; // 0x110
    }; // sizeof = 118

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

}
