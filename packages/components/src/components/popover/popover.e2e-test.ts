/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';
import StickerSheet from '../../../config/playwright/setup/utils/Stickersheet';
import { test, ComponentsPage } from '../../../config/playwright/setup';
import type { PopoverPlacement, PopoverTrigger } from './popover.types';
import type { ModalContainerColor, ModalContainerRole } from '../modalcontainer/modalcontainer.types';
import { DEFAULTS, POPOVER_PLACEMENT, TRIGGER } from './popover.constants';
import { COLOR, ROLE } from '../modalcontainer/modalcontainer.constants';

type SetupOptions = {
  componentsPage: ComponentsPage;
  id?: string;
  triggerID: string;
  trigger?: PopoverTrigger;
  placement?: PopoverPlacement;
  delay?: string;
  setIndex?: number;
  visible?: boolean;
  offset?: boolean;
  interactive?: boolean;
  focusTrap?: boolean;
  showArrow?: boolean;
  color?: ModalContainerColor;
  flip?: boolean;
  size?: boolean;
  backdrop?: boolean;
  closeButton?: boolean;
  preventScroll?: boolean;
  hideOnBlur?: boolean;
  hideOnEscape?: boolean;
  hideOnOutsideClick?: boolean;
  focusBackToTrigger?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  role?: ModalContainerRole;
  children?: any;
};

const setup = async (args: SetupOptions) => {
  const { componentsPage, ...restArgs } = args;
  await componentsPage.mount({
    html: `
    <div id="wrapper">
      <mdc-button id="${restArgs.triggerID}">Click Me!</mdc-button>
      <mdc-popover
        ${restArgs.id ? `id="${restArgs.id}"` : ''}
        ${restArgs.triggerID ? `triggerID="${restArgs.triggerID}"` : ''}
        ${restArgs.trigger ? `trigger="${restArgs.trigger}"` : ''}
        ${restArgs.placement ? `placement="${restArgs.placement}"` : ''}
        ${restArgs.delay ? `delay="${restArgs.delay}"` : ''}
        ${restArgs.setIndex ? `setIndex="${restArgs.setIndex}"` : ''}
        ${restArgs.visible ? 'visible' : ''}
        ${restArgs.offset ? `offset="${restArgs.offset}"` : ''}
        ${restArgs.interactive ? 'interactive' : ''}
        ${restArgs.focusTrap ? 'focus-trap' : ''}
        ${restArgs.showArrow ? 'show-arrow' : ''}
        ${restArgs.color ? `color="${restArgs.color}"` : ''}
        ${restArgs.flip ? 'flip' : ''}
        ${restArgs.size ? 'size' : ''}
        ${restArgs.backdrop ? 'backdrop' : ''}
        ${restArgs.closeButton ? 'close-button' : ''}
        ${restArgs.preventScroll ? `prevent-scroll="${restArgs.preventScroll}"` : ''}
        ${restArgs.hideOnBlur ? `hide-on-blur="${restArgs.hideOnBlur}"` : ''}
        ${restArgs.hideOnEscape ? `hide-on-escape="${restArgs.hideOnEscape}"` : ''}
        ${restArgs.hideOnOutsideClick ? `hide-on-outside-click="${restArgs.hideOnOutsideClick}"` : ''}
        ${restArgs.focusBackToTrigger ? `focus-back-to-trigger="${restArgs.focusBackToTrigger}"` : ''}
        ${restArgs.ariaLabel ? `aria-label="${restArgs.ariaLabel}"` : ''}
        ${restArgs.ariaLabelledby ? `aria-labelledby="${restArgs.ariaLabelledby}"` : ''}
        ${restArgs.ariaDescribedby ? `aria-describedby="${restArgs.ariaDescribedby}"` : ''}
        ${restArgs.role ? `role="${restArgs.role}"` : ''}
      >
        ${restArgs.children}
      </mdc-popover>
    </div>
    `,
    clearDocument: true,
  });
  const wrapper = componentsPage.page.locator('div#wrapper');
  await wrapper.waitFor();
  const popover = componentsPage.page.locator(`#${restArgs.id}`);
  return popover;
};

const attributeTestCases = async (componentsPage: ComponentsPage) => {
  const popover = await setup({
    componentsPage,
    id: 'popover',
    triggerID: 'trigger-button',
    children: 'Lorem ipsum dolor sit amet.',
  });

  /**
   * DEFAULTS ATTRIBUTES
   */
  await test.step('default attributes for popover', async () => {
    await expect(popover).toHaveAttribute('placement', DEFAULTS.PLACEMENT);
    await expect(popover).toHaveAttribute('delay', DEFAULTS.DELAY);
    await expect(popover).toHaveAttribute('set-index', DEFAULTS.SET_INDEX.toString());
    await expect(popover).not.toHaveAttribute('visible');
    await expect(popover).toHaveAttribute('offset', DEFAULTS.OFFSET.toString());
    await expect(popover).not.toHaveAttribute('interactive');
    await expect(popover).not.toHaveAttribute('focus-trap');
    await expect(popover).not.toHaveAttribute('show-arrow');
    await expect(popover).toHaveAttribute('color', DEFAULTS.COLOR);
    await expect(popover).toHaveAttribute('flip');
    await expect(popover).not.toHaveAttribute('size');
    await expect(popover).not.toHaveAttribute('backdrop');
    await expect(popover).not.toHaveAttribute('close-button');
    await expect(popover).not.toHaveAttribute('prevent-scroll');
    await expect(popover).not.toHaveAttribute('hide-on-blur');
    await expect(popover).not.toHaveAttribute('hide-on-escape');
    await expect(popover).not.toHaveAttribute('hide-on-outside-click');
    await expect(popover).not.toHaveAttribute('focus-back-to-trigger');
    await expect(popover).not.toHaveAttribute('aria-label');
    await expect(popover).not.toHaveAttribute('aria-labelledby');
    await expect(popover).not.toHaveAttribute('aria-describedby');
    await expect(popover).toHaveAttribute('role', DEFAULTS.ROLE);
  });

  /**
   * ATTRIBUTES
   */
  await test.step('attributes should be set correctly for popover', async () => {
    await componentsPage.setAttributes(popover, {
      placement: POPOVER_PLACEMENT.TOP,
      trigger: TRIGGER.MANUAL,
      delay: '100,100',
      'set-index': '2000',
      visible: '',
      offset: '8',
      interactive: '',
      'focus-trap': '',
      'show-arrow': '',
      color: COLOR.CONTRAST,
      flip: 'false',
      size: '',
      backdrop: '',
      'close-button': '',
      'prevent-scroll': '',
      'hide-on-blur': '',
      'hide-on-escape': '',
      'hide-on-outside-click': '',
      'focus-back-to-trigger': '',
      'aria-label': 'popover',
      'aria-labelledby': 'popover-label',
      'aria-describedby': 'popover-description',
      role: ROLE.ALERT_DIALOG,
    });
    await expect(popover).toHaveAttribute('placement', POPOVER_PLACEMENT.TOP);
    await expect(popover).toHaveAttribute('delay', '100,100');
    await expect(popover).toHaveAttribute('set-index', '2000');
    await expect(popover).toHaveAttribute('visible');
    await expect(popover).toHaveAttribute('offset', '8');
    await expect(popover).toHaveAttribute('interactive');
    await expect(popover).toHaveAttribute('focus-trap');
    await expect(popover).toHaveAttribute('show-arrow');
    await expect(popover).toHaveAttribute('color', COLOR.CONTRAST);
    await expect(popover).toHaveAttribute('flip', 'false');
    await expect(popover).toHaveAttribute('size');
    await expect(popover).toHaveAttribute('backdrop');
    await expect(popover).toHaveAttribute('close-button');
    await expect(popover).toHaveAttribute('prevent-scroll');
    await expect(popover).toHaveAttribute('hide-on-blur');
    await expect(popover).toHaveAttribute('hide-on-escape');
    await expect(popover).toHaveAttribute('hide-on-outside-click');
    await expect(popover).toHaveAttribute('focus-back-to-trigger');
    await expect(popover).toHaveAttribute('aria-label', 'popover');
    await expect(popover).toHaveAttribute('aria-labelledby', 'popover-label');
    await expect(popover).toHaveAttribute('aria-describedby', 'popover-description');
    await expect(popover).toHaveAttribute('role', ROLE.ALERT_DIALOG);
  });

  /**
   * PLACEMENT ATTRIBUTES
   */
  await test.step('Popover Placement Attributes', async () => {
    for (const placement of Object.values(POPOVER_PLACEMENT)) {
      await test.step(`attribute placement ${placement} should be present as expected`, async () => {
        await componentsPage.setAttributes(popover, { placement });
        await expect(popover).toHaveAttribute('placement', placement);
      });
    }
  });

  /**
   * TRIGGER ATTRIBUTES
   */
  await test.step('Popover Trigger Attributes', async () => {
    await test.step('attribute trigger focusin should be present as expected', async () => {
      await componentsPage.setAttributes(popover, { trigger: TRIGGER.FOCUSIN });
      await expect(popover).toHaveAttribute('trigger', TRIGGER.FOCUSIN);
    });

    await test.step('attribute trigger mouseenter should be present as expected', async () => {
      await componentsPage.removeAttribute(popover, 'interactive');
      await componentsPage.setAttributes(popover, { trigger: TRIGGER.MOUSEENTER });
      await expect(popover).toHaveAttribute('trigger', `${TRIGGER.MOUSEENTER} ${TRIGGER.FOCUSIN}`);
    });

    await test.step('attribute trigger mouseenter and interactive popover should be present as expected', async () => {
      await componentsPage.setAttributes(popover, { trigger: TRIGGER.MOUSEENTER, interactive: '' });
      await expect(popover).toHaveAttribute('trigger', `${TRIGGER.MOUSEENTER} ${TRIGGER.CLICK}`);
    });
  });

  /**
   * COLOR ATTRIBUTES
   */
  await test.step('Popover Color Attributes', async () => {
    for (const color of Object.values(COLOR)) {
      await test.step(`attribute placement ${color} should be present as expected`, async () => {
        await componentsPage.setAttributes(popover, { color });
        await expect(popover).toHaveAttribute('color', color);
      });
    }
  });

  /**
   * INVALID ATTRIBUTES
   */
  await test.step('Invalid Attributes', async () => {
    await test.step('should fallback to default values when invalid attributes are passed', async () => {
      await componentsPage.setAttributes(popover, {
        placement: 'invalid',
        trigger: 'invalid',
        delay: 'invalid',
        color: 'invalid',
        role: 'invalid',
      });
      await expect(popover).toHaveAttribute('placement', DEFAULTS.PLACEMENT);
      await expect(popover).toHaveAttribute('trigger', DEFAULTS.TRIGGER);
      await expect(popover).toHaveAttribute('delay', DEFAULTS.DELAY);
      await expect(popover).toHaveAttribute('color', DEFAULTS.COLOR);
      await expect(popover).toHaveAttribute('role', DEFAULTS.ROLE);
    });
  });
};

/**
 * VISUAL REGRESSION
 */
const visualRegressionTestCases = async (componentsPage: ComponentsPage) => {
  const stickerSheet = new StickerSheet(componentsPage, 'mdc-popover');

  stickerSheet.setChildren(`
    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10vh;
      width: 20vw;
      flex-direction: column;
    "
    >
      <mdc-icon name='exchange-bold'></mdc-icon>
      <mdc-text type="body-midsize-bold">Slot content</mdc-text>
      <mdc-text type="body-small-regular">This is a placeholder. Swap me with your local component.</mdc-text>
    </div>
  `);


};

test.use({ viewport: { width: 1000, height: 1000 } });
test('mdc-popover', async ({ componentsPage }) => {
  /**
   * ATTRIBUTES
   */
  await test.step('Attributes for Popover Component', async () => {
    await attributeTestCases(componentsPage);
  });

  /**
   * VISUAL REGRESSION
   */
  await test.step('visual-regression', async () => {
    await visualRegressionTestCases(componentsPage);
  });

  // /**
  //  * INTERACTIONS
  //  */
  // await test.step('interactions', async () => {
  //   await test.step('mouse/pointer', async () => {
  //     await test.step('component should fire callback x when clicking on it', async () => {
  //       // TODO: add test here
  //     });
  //   });

  //   await test.step('focus', async () => {
  //     await test.step('component should be focusable with tab', async () => {
  //       // TODO: add test here
  //     });

  //     // add additional tests here, like tabbing through several parts of the component
  //   });

  //   await test.step('keyboard', async () => {
  //     await test.step('component should fire callback x when pressing y', async () => {
  //       // TODO: add test here
  //     });
  //   });

  /**
     * ACCESSIBILITY
     */
  // await test.step('accessibility', async () => {
  //   await componentsPage.accessibility.checkForA11yViolations('popover-default');
  // });
});
