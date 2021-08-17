import React, { useEffect } from 'react';
import './index.scss';
import { customizeDocContent, addScrollListener } from './helper';
import Footer from '../Footer';
import Breadcrums from '../Breadcrums';
import { HOME_PAGE_ID } from '../../configs/doc-configs';

const Document = (props: {
    pageid?: string;
    docTitle: string;
    docContent: string;
    isPublicSiteOpen: boolean;
    shouldShowRightNav: boolean
    breadcrumsData: any;
}) => {
    useEffect(() => {
        customizeDocContent();
    }, [props.docContent]);

    useEffect(() => {
        addScrollListener();
    }, []);

    return (
        <div
            className="documentWrapper"
            style={{
                width: !props.shouldShowRightNav ? '100%' : null,
            }}
        >
            {props.pageid !== HOME_PAGE_ID && (
                <Breadcrums
                    breadcrumsData={props.breadcrumsData}
                    pageid={props.pageid}
                />
            )}
            <div
                id={props.docTitle}
                className="documentView"
                dangerouslySetInnerHTML={{
                    __html: props.docContent,
                }}
            />
            {props.isPublicSiteOpen && <Footer />}
        </div>
    );
};

export default Document;
