import { PinboardEmbed, PinboardViewConfig } from './pinboard';
import { init } from '../index';
import { Action, AuthType, EmbedEvent, RuntimeFilterOp } from '../types';
import {
    executeAfterWait,
    getDocumentBody,
    getIFrameSrc,
    getRootEl,
} from '../test/test-utils';
import { version } from '../../package.json';

const defaultViewConfig = {
    frameParams: {
        width: 1280,
        height: 720,
    },
};
const pinboardId = 'eca215d4-0d2c-4a55-90e3-d81ef6848ae0';
const vizId = '6e73f724-660e-11eb-ae93-0242ac130002';
const thoughtSpotHost = 'tshost';
const defaultParams = `&hostAppUrl=local-host&viewPortHeight=768&viewPortWidth=1024&sdkVersion=${version}`;

beforeAll(() => {
    init({
        thoughtSpotHost,
        authType: AuthType.None,
    });
});

describe('Pinboard/viz embed tests', () => {
    beforeEach(() => {
        document.body.innerHTML = getDocumentBody();
    });

    test('should render pinboard', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should set disabled actions', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            disabledActions: [
                Action.DownloadAsCsv,
                Action.DownloadAsPdf,
                Action.DownloadAsXlsx,
            ],
            disabledActionReason: 'Action denied',
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}&disableAction=[%22${Action.DownloadAsCsv}%22,%22${Action.DownloadAsPdf}%22,%22${Action.DownloadAsXlsx}%22]&disableHint=Action%20denied#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should set hidden actions', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            hiddenActions: [
                Action.DownloadAsCsv,
                Action.DownloadAsPdf,
                Action.DownloadAsXlsx,
            ],
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}&hideAction=[%22${Action.DownloadAsCsv}%22,%22${Action.DownloadAsPdf}%22,%22${Action.DownloadAsXlsx}%22]#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should set visible actions', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            visibleActions: [
                Action.DownloadAsCsv,
                Action.DownloadAsPdf,
                Action.DownloadAsXlsx,
            ],
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}&visibleActions=[%22${Action.DownloadAsCsv}%22,%22${Action.DownloadAsPdf}%22,%22${Action.DownloadAsXlsx}%22]#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should enable viz transformations true', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            enableVizTransformations: true,
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}&enableVizTransform=true#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should disable viz transformations when enableVizTransformations false', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            enableVizTransformations: false,
            ...defaultViewConfig,
            pinboardId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}&enableVizTransform=false#/embed/viz/${pinboardId}`,
            );
        });
    });

    test('should render viz', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            ...defaultViewConfig,
            pinboardId,
            vizId,
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true${defaultParams}#/embed/viz/${pinboardId}/${vizId}`,
            );
        });
    });

    test('should apply runtime filters', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            ...defaultViewConfig,
            pinboardId,
            vizId,
            runtimeFilters: [
                {
                    columnName: 'sales',
                    operator: RuntimeFilterOp.EQ,
                    values: [1000],
                },
            ],
        } as PinboardViewConfig);
        pinboardEmbed.render();
        await executeAfterWait(() => {
            expect(getIFrameSrc()).toBe(
                `http://${thoughtSpotHost}/?embedApp=true&col1=sales&op1=EQ&val1=1000${defaultParams}#/embed/viz/${pinboardId}/${vizId}`,
            );
        });
    });

    test('should register event handler to adjust iframe height', async () => {
        const pinboardEmbed = new PinboardEmbed(getRootEl(), {
            ...defaultViewConfig,
            fullHeight: true,
            pinboardId,
            vizId,
        } as PinboardViewConfig);

        const onSpy = jest.spyOn(pinboardEmbed, 'on');
        pinboardEmbed.render();

        executeAfterWait(() => {
            expect(onSpy).toHaveBeenCalledWith(
                EmbedEvent.EmbedHeight,
                expect.anything(),
            );
        });
    });
});
